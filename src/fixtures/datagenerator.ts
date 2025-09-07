import{test as base} from '@playwright/test'
import testdata from '../fixtures/todos.json'

export type TestData ={
    todos: string[];
    toComplete: string;
    toDelete: string;
};

export const test = base.extend<{testdata: TestData}>(
    {
        testdata: async({},use) =>{
            await use(testdata as TestData)
        }
    }
);

export const expect = base.expect
