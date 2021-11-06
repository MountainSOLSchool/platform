import * as pdf from 'html-pdf';
import * as functions from 'firebase-functions';

export class FirebasePdf {
    public static respondWithPdf(
        pdf: pdf.CreateResult,
        response: functions.Response
    ): void {
        pdf.toBuffer((err, buffer) => response.send(buffer.toJSON()));
    }
}