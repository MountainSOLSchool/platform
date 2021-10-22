export type StudentDbEntry = {
    first_name: string;
    last_name: string;
    code_word: string;
    ok_to_photograph: boolean;
    ok_use_name_photographs: boolean;
    sunscreen_bug_spray: string;
    medications: Array<{
      name: string;
      dosage: string;
      doctor: { name: string; role?: string };
    }>;
  };