import TodosColumnListItem from "./TodosColumnListItem"
import { Text, Card, Group, Flex, ScrollArea, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    card: {
        background: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }
}))

const TodosColumn = ({ title, todos = [] }) => {
    const { classes } = useStyles()

    return (

        <Card padding="lg" radius="xl" pos="static" className={classes.card} h="88vh">

            <Group position="center" mb="xs" >
                <Text size="xl" weight={500}>{title}</Text>
            </Group>
            <ScrollArea h="75vh"
                styles={(theme) => ({
                    scrollbar: {
                        '&, &:hover': {
                            background:
                                theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
                        },

                        '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
                            backgroundColor: theme.colors.blue[6],
                        },

                        '&[data-orientation="horizontal"] .mantine-ScrollArea-thumb': {
                            backgroundColor: theme.colors.blue[6],
                        },
                    },

                    corner: {
                        opacity: 1,
                        background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    },
                })}>
                <Flex direction={"column"} gap={24}>
                    {todos.map((item) => {
                        return (
                            <TodosColumnListItem key={item.id} todo={item} />
                        )
                    })}

                </Flex>
            </ScrollArea>
        </Card>
    )
}

export default TodosColumn