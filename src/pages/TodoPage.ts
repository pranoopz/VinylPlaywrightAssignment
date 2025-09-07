
import {expect, Locator, Page} from '@playwright/test'
import { link } from 'fs';

export class TodoPage{
    
    async clearStorage() {
        await this.page.evaluate(() => localStorage.clear());
        await this.page.reload();
    }
    async goto() {
        await this.page.goto('');
    }
    
    readonly page: Page
    readonly todoList: Locator;
    readonly completedFilter: Locator

    constructor(page: Page){
        this.page = page;
        this.todoList =  page.getByTestId("todo-item");
        this.completedFilter = page.getByRole("link",{name:'Completed'});
    }

    AddTodos(todos: string[]) {
        for(const todo of todos){
        this.page.getByPlaceholder("What needs to be done?").fill(todo);
        this.page.getByPlaceholder("What needs to be done?").press('Enter');
        }        
    }

    TodoLocator(todo: string): Locator{

        return this.todoList.getByText(todo,{exact:true});

    }

    async assertTodoVisible(todo: string){
        await expect(this.TodoLocator(todo)).toBeVisible();
    }

    async AssertTodoNotVisible(todo: string) {
        await expect(this.TodoLocator(todo)).toHaveCount(0);
    }    

    async MarkToDoCompleted(toComplete: string) {
        
        const checkbox = await this.TodoLocator(toComplete).locator('..').getByRole('checkbox', { name: 'Toggle Todo' });
        checkbox.check();
        await expect(checkbox).toBeChecked();
    }

    async DeleteTodo(toDelete: string) {
    const row = await this.TodoLocator(toDelete).locator('..');
    row.hover();
    await row.locator("button").click();
    }
       
    async SelectFilter(filter: string) {
        
        if(filter == "Completed")
            await this.completedFilter.click()
    }

}