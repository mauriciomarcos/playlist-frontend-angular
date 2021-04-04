import { Result } from './result.model';

export class ResponsePageable{
    result: Result;
    id: number;
    exception: any;
    status: number;
    isCanceled: boolean;
    isCompleted: boolean;
    isCompletedSuccessfully: boolean;
    creationOptions: number;
    asyncState: any;
    isFaulted: boolean;
}