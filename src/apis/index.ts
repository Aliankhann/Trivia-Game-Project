// src/apis/index.ts
import { TriviaAPI } from "./BaseTriviaApi";
import { openTDBApi } from "./OpenTDB/openTDBClient";

export const registeredTriviaAPIs: TriviaAPI[] = [openTDBApi];
