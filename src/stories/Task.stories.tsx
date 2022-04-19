import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Task} from "../components/Task/Task";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


export default {
  title: 'TODOLIST/TASK',
  component: Task,
  decorators: [ReduxStoreProviderDecorator],
  argTypes: {
    id: {description: 'id'},
    todolistId: {description: 'todolistId'},
  },
} as ComponentMeta<typeof Task>;



const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStories = Template.bind({});
TaskIsDoneStories.args = {
  id: '1',
  todolistId: 'todolistId1',
};

export const TaskIsNotDoneStories = Template.bind({});
TaskIsNotDoneStories.args = {
  id: '2',
  todolistId: 'todolistId1',
};
