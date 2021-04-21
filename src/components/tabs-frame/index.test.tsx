import React from 'react';
import { render, fireEvent, screen, waitFor } from 'test-utils/setupTestingLibrary';
import { TabsFrame } from './';

describe("<TabsFrame>", () => {
    describe("given multiple tabs", () => {
        const props = {
            tabs: {
                '123': {
                    id: '123',
                    label: 'first',
                    children: (<button>test1</button>)
                },
                '456': {
                    id: '456',
                    canNavigate: true,
                    label: 'second',
                    children: (<button>test2</button>)
                },
                '789': {
                    id: '789',
                    canNavigate: true,
                    label: 'third',
                    children: (<button>test3</button>)
                }
            }
        }

        it('should render', () => {
            render(<TabsFrame {...props}></TabsFrame>);

            expect(screen.getAllByRole('tab').length).toBe(3);
            expect(screen.getByText('first')).toBeDefined();
            expect(screen.getByText('second')).toBeDefined();
            expect(screen.getByText('third')).toBeDefined();
            expect(screen.getByRole('tabpanel')).toBeDefined();
            expect(screen.getByRole('button', {
                name: /test1/i
            })).toBeVisible();
        });

        describe('a tab is clicked', () => {
            it('should change tab panel', () => {
                const stub = jest.fn();
                const propsWithClick = {
                    tabs: {
                        '123': {
                            id: '123',
                            label: 'first',
                            children: (<button>test1</button>)
                        },
                        '456': {
                            id: '456',
                            label: 'second',
                            onShow: () => stub(),
                            children: (<button>test2</button>)
                        },
                        '789': {
                            id: '789',
                            label: 'third',
                            children: (<button>test3</button>)
                        },
                    }
                }

                render(<TabsFrame {...propsWithClick}></TabsFrame>);

                fireEvent.click(screen.getByText('second'));

                waitFor(() => {
                    expect(screen.getByRole('button', {
                        name: /test2/i
                    })).toBeVisible();
                    expect(stub).toBeCalled();
                });                
            });
        });
    });
});