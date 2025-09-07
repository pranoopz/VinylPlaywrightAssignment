
import {expect, Locator, Page} from '@playwright/test'
import { link } from 'fs';

export class TodoPage{
    
    /**
     * Clears browsers local storage and reload current page
     */
    async clearStorage() {
        await this.page.evaluate(() => localStorage.clear());
        await this.page.reload();
    }

    /**
     * This method launchs the default URL configured in config.ts file
     */
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
    
    /**
     * This method adds all the todos provided in the parameter to the list
     * @param todos The List of todos to be added
     * 
     */
    AddTodos(todos: string[]) {
        for(const todo of todos){
        this.page.getByPlaceholder("What needs to be done?").fill(todo);
        this.page.getByPlaceholder("What needs to be done?").press('Enter');
        }        
    }

    TodoLocator(todo: string): Locator{

        return this.todoList.getByText(todo,{exact:true});

    }
    
    /**
     * This method verifies if the given Todo is visible
     * @param todo The Todo which needs to be checked
     */
    async assertTodoVisible(todo: string){
        await expect(this.TodoLocator(todo)).toBeVisible();
    }
    
    /**
     * This method verifies the given Todo is not visible
     * @param todo The Todo which is not expected to be visible
     */
    async AssertTodoNotVisible(todo: string) {
        await expect(this.TodoLocator(todo)).toHaveCount(0);
    }    
    
    /**
     * This method marks the given todo as completed
     * @param toComplete The TODO to be marked as complete
     */
    async MarkToDoCompleted(toComplete: string) {
        
        const checkbox = await this.TodoLocator(toComplete).locator('..').getByRole('checkbox', { name: 'Toggle Todo' });
        checkbox.check();
        await expect(checkbox).toBeChecked();
    }
 
    /**
     * This method deletes the given TODO
     * @param toDelete The TODO to be deleted
     */
    async DeleteTodo(toDelete: string) {
    const row = await this.TodoLocator(toDelete).locator('..');
    row.hover();
    await row.locator("button").click();
    }
    
    /**
     * This method applies the given filter
     * @param filter The Filter to be selected
     */
    async SelectFilter(filter: string) {
        
        if(filter == "Completed")
            await this.completedFilter.click()
    }

}