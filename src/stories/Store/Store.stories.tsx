import { StoreProvider } from './Store';
import type { Meta, StoryObj } from '@storybook/react';
import { BaseActions } from './BaseActions';
import { ExternalStorage } from './ExternalStorage';

const meta = {
  title: 'Store',
  component: StoreProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StoreProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base_Actions: Story = {
  args: {
    children: <BaseActions />,
  },
};

export const External_Storage: Story = {
  args: {
    externalStorage: {
      setValues: (values) => {
        window.localStorage.setItem('filters', JSON.stringify(values));
      },
      getValues: () => {
        return JSON.parse(window.localStorage.getItem('filters')) || {};
      },
    },
    children: <ExternalStorage />,
  },
};
