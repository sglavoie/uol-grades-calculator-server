type basicSummary = Readonly<{
  level: number;
  module_name: string;
}>;

type letterGrades =
  | 'A'
  | 'A-'
  | 'B+'
  | 'B'
  | 'B-'
  | 'C+'
  | 'C'
  | 'C-'
  | 'D+'
  | 'D'
  | 'D-'
  | 'F'
  | 'N/A';

type classHonours =
  | 'First Class Honours'
  | 'Second Class Honours [Upper Division]'
  | 'Second Class Honours [Lower Division]'
  | 'Third Class Honours'
  | 'Fail';

type summarizeDoneModule = basicSummary &
  Readonly<{
    completion_date: string;
    final_score: number;
    final_weight: number;
    midterm_score: number;
    midterm_weight: number;
    module_score: number;
  }>;

type summarizeProgressModule = basicSummary &
  Readonly<{
    final_score?: number;
    final_weight?: number;
    midterm_score?: number;
    midterm_weight?: number;
  }>;

export type checkScoreAccuracyResponse = Readonly<{
  ok: boolean;
  accuracy: {
    [module: string]: {
      actual: string;
      expected: string;
    };
  };
}>;

export type summarizeDoneResponse = Readonly<{
  modules: summarizeDoneModule[];
  weighted_average: number;
  unweighted_average: number;
  weighted_ects: letterGrades;
  unweighted_ects: letterGrades;
  weighted_us: letterGrades;
  unweighted_us: letterGrades;
  weighted_class: classHonours;
  weighted_gpa_us: number;
  weighted_gpa_uk: number;
  credits_done: number;
  percentage_done: number;
}>;

export type summarizeProgressResponse = Readonly<{
  in_progress: {
    modules: summarizeProgressModule[];
    weighted_average: number;
    unweighted_average: number;
  };
  average_in_progress_only: {
    weighted: number;
    unweighted: number;
  };
}>;

export type summarizeAllResponse = Readonly<{
  done: summarizeDoneResponse;
  progress: {
    modules: summarizeProgressModule[];
    weighted_average: number;
    unweighted_average: number;
  };
}>;

export type gradesResponse = {
  [module: string]: {
    completion_date: string;
    final_score: number;
    final_weight: number;
    midterm_score: number;
    midterm_weight: number;
    module_score: number;
    level: number;
  };
};
