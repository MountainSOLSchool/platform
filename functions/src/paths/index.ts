import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as pdf from "html-pdf";
import * as CORS from "cors";
import {
  CellStyle,
  FlatRecord,
  CellStyleBuilder,
  StudentDbEntry,
  StudentRecord,
  StudentRecordPropertyNames,
  TableHeader,
  TableRow,
} from "../models";

admin.initializeApp();
const db = admin.firestore();
const cors = CORS({ origin: true });

export const roster = aGetEndpoint(async (request, response) => {
  const className = request.query.class as string;

  const pdf = await createRosterPdf(className);

  respondWithPdf(pdf, response);
});

function aGetEndpoint(
  handler: (
    request: functions.https.Request,
    response: functions.Response
  ) => void
) {
  return functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => handler(request, response));
  });
}

function respondWithPdf(
  pdf: pdf.CreateResult,
  response: functions.Response
): void {
  pdf.toBuffer((err, buffer) => response.send(buffer.toJSON()));
}

async function createRosterPdf(className: string) {
  const students = await fetchStudents(className);

  const studentRecords = transformStudentEntriesIntoRecords(students);

  return createTablePdf({
    records: studentRecords,
    headers: studentRowHeaders,
    styleBuilder: buildStudentRecordStyle,
  });
}

function createTablePdf<T, PropertyNames extends string>({
  records,
  headers,
  styleBuilder,
}: {
  records: Array<FlatRecord<PropertyNames>>;
  headers: readonly TableHeader<PropertyNames>[];
  styleBuilder: CellStyleBuilder<PropertyNames>;
}) {
  const htmlTable = generateHtmlTableFromRecords({
    records,
    headers,
    styleBuilder,
  });

  return pdf.create(htmlTable, {
    orientation: "landscape",
  });
}

function transformStudentEntriesIntoRecords(
  students: Array<StudentDbEntry>
): Array<StudentRecord> {
  return students.map((student) => ({
    firstName: student.first_name,
    lastName: student.last_name,
    codeWord: student.code_word,
    okToPhotograph: student.ok_to_photograph ? "Yes" : "No",
    okUseNamePhotographs: student.ok_use_name_photographs ? "Yes" : "No",
    sunscreenBugSpray: student.sunscreen_bug_spray ? "Yes" : "No",
    medications: student.medications
      ?.map(
        (med) =>
          `${med.name} is prescribed by ${med.doctor} and show be taken "${med.dosage}"`
      )
      ?.join(", "),
  }));
}

function transformRecordsIntoTableRows<PropertyNames extends string>(
  records: Array<FlatRecord<PropertyNames>>,
  styleBuilder: CellStyleBuilder<PropertyNames>
): Array<TableRow<PropertyNames>> {
  return records.map((record) => ({
    cells: Object.entries(record).map(([key, value]) => {
      const propertyName = key as PropertyNames;
      const textContent = value as string;
      return {
        propertyName,
        textContent,
        style: styleBuilder(propertyName, textContent),
      };
    }),
  }));
}

function createHtmlTable<T extends string>(
  headers: readonly TableHeader<T>[],
  rows: Array<TableRow<T>>
): string {
  const headerTitles = headers.map((h) => h.title);
  return `
  <table>
      <tr>
        ${headers.map((h) => "<th>" + h.title + "</th>").join("")}
      </tr>
      ${rows
        .map(
          (r) =>
            "<tr>" +
            [...r.cells]
              .sort(
                (a, b) =>
                  headerTitles.indexOf(a.propertyName) -
                  headerTitles.indexOf(b.propertyName)
              )
              .map(
                (c) =>
                  "<td style='background-color:" +
                  (c.style.isHighlighted ? "yellow" : "white") +
                  ";font-weight:" +
                  (c.style.isBold ? "bold" : "normal") +
                  "'>" +
                  c.textContent +
                  "</td>"
              )
              .join("") +
            "</tr>"
        )
        .join("")}
    </table>
  `;
}

const studentRowHeaders: readonly TableHeader<StudentRecordPropertyNames>[] = [
  {
    title: "Last Name",
    propertyName: "lastName",
  },
  {
    title: "First Name",
    propertyName: "firstName",
  },
  {
    title: "Code Word",
    propertyName: "codeWord",
  },
  {
    title: "Can Photograph",
    propertyName: "okToPhotograph",
  },
  {
    title: "Can Use Name",
    propertyName: "okUseNamePhotographs",
  },

  {
    title: "Can Apply Sunscreen/Bugspray",
    propertyName: "sunscreenBugSpray",
  },
  {
    title: "Medications",
    propertyName: "medications",
  },
] as const;

function buildStudentRecordStyle(
  propertyName: StudentRecordPropertyNames,
  value: string
): CellStyle {
  const isImportant =
    value === "No" || (propertyName === "medications" && value?.length > 0);
  return {
    isHighlighted: isImportant,
    isBold: isImportant,
  };
}

function generateHtmlTableFromRecords<T, PropertyNames extends string>({
  records,
  headers,
  styleBuilder,
}: {
  records: Array<FlatRecord<PropertyNames>>;
  headers: readonly TableHeader<PropertyNames>[];
  styleBuilder: CellStyleBuilder<PropertyNames>;
}) {
  const rows = transformRecordsIntoTableRows(records, styleBuilder);

  return createHtmlTable(headers, rows);
}

async function fetchStudents(
  className: string
): Promise<Array<StudentDbEntry>> {
  const classes = db.collection("classes");

  const classDocument = await fetchFirstMatchingDocument(classes, [
    "name",
    "==",
    className,
  ]);

  const classStudentRefs: Array<FirebaseFirestore.DocumentReference> =
    classDocument?.get("students") ?? [];

  const students = await Promise.all(
    classStudentRefs.map(
      async (studentRef) => (await studentRef.get()).data() as StudentDbEntry
    )
  );

  return students;
}

async function fetchFirstMatchingDocument(
  collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
  query: [
    string | FirebaseFirestore.FieldPath,
    FirebaseFirestore.WhereFilterOp,
    string
  ]
): Promise<
  | FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  | undefined
> {
  const documents = await collection.where(...query).get();
  return documents.docs[0];
}
