import { OrderQuestionOptions } from './interfaces/order-question-options';
import { QuestionBase } from './question-base';
export declare class OrderQuestion extends QuestionBase {
    orderType: string;
    selectableOrders: {
        concept: string;
        label: string;
    }[];
    orderSettingUuid: string;
    rendering: string;
    options: any[];
    constructor(options: OrderQuestionOptions);
}
