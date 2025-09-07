import { test as basetest, test } from '../fixtures/datagenerator';
import {expect} from '@playwright/test'
import {TodoPage} from '../pages/TodoPage'
import { threadCpuUsage } from 'process';


let todoPage: TodoPage;

test.beforeEach(async({page}) =>{

    todoPage = new TodoPage(page);
    await todoPage.goto()
    await todoPage.clearStorage()
}
)

test("Add 3 todos and verify they are displayed",async({page,testdata})=>{

    await todoPage.AddTodos(testdata.todos)

    for(const todo of testdata.todos){
        todoPage.assertTodoVisible(todo)
    }
    
})

test("Mark Todo as complete and appears in Completed filter",async({page,testdata})=>{
    
    await test.step("Add todo", async()=>{
         await todoPage.AddTodos(testdata.todos)
            for(const todo of testdata.todos){
                todoPage.assertTodoVisible(todo)
            };
    });
   
    await test.step("Mark todo complete",async()=>{
         await todoPage.MarkToDoCompleted(testdata.toComplete);
    })
   
    await test.step("Verify Todo appears in completed filter",async()=>{
        await todoPage.SelectFilter("Completed");
        await todoPage.assertTodoVisible(testdata.toComplete);
    })
    
})

test("Mark Todo as Deleted and it not longer appears in the list",async({page,testdata})=>{
    
    await test.step("Add todo", async()=>{
         await todoPage.AddTodos(testdata.todos)
            for(const todo of testdata.todos){
                todoPage.assertTodoVisible(todo)
            };
    });
   
    await test.step("Delete Todo",async()=>{
         await todoPage.DeleteTodo(testdata.toDelete);
    })
   
    await test.step("Verify Todo does not appear in List",async()=>{
        await todoPage.AssertTodoNotVisible(testdata.toDelete);
    })
    
})

test("Persistance check. Add 3 todos and refresh screen to verify todos are displayed ",async({page,testdata})=>{

    await test.step("Add todos",async()=>{
         await todoPage.AddTodos(testdata.todos)
    })
   
    await test.step("Refresh screen and verify todos still available",async()=>{
        await page.reload();
        for(const todo of testdata.todos){
        todoPage.assertTodoVisible(todo)
    }
    })
    
    
})