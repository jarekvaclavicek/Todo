import { useState } from 'react';
import { createStyles, Header, Group, ActionIcon, Container, rem, useMantineColorScheme, Input, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSun, IconMoonStars, IconSearch, IconX } from '@tabler/icons-react';
import TodosCreateForm from './TodosCreateForm';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: rem(50),

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },

  links: {
    width: rem(260),

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  social: {
    width: rem(260),

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },

  link: {
    display: 'block',
    border: "none",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

function NavigationHeader({ onSearch, search }) {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes, cx } = useStyles();

  // DARK MODE
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const [showCreateModal, setShowCreateModal] = useState(false)



  const handleSearchClear = () => {
    onSearch("")
  }

  const renderClearIcon = () => {
    if (!search.length) {
      return
    }
    return (

      <ActionIcon radius='xl' onClick={handleSearchClear}>
        <IconX
          size={26}
          color={'red'}

        />
      </ActionIcon>
    )
  }

  return (
    <Header height={54}>
      <Container className={classes.inner}>

        <Group className={classes.links} spacing={10}>
          <div>TODO</div>
        </Group>

        <Input style={{ width: 'calc(50%)' }}
          radius="xl"
          icon={<IconSearch size="1.1rem" />}
          placeholder="Search"
          onChange={(event) => onSearch(event.target.value)}

          value={search}
          rightSection={renderClearIcon()}

        />

        <Group spacing={30} className={classes.social} position="right" noWrap>

          <Button variant="light" color="green" radius="md" type="submit" onClick={() => setShowCreateModal(true)}>
            Create
          </Button>

          <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Color scheme"
          >
            {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
          </ActionIcon>

          <TodosCreateForm opened={showCreateModal} onClose={() => setShowCreateModal(false)} />

        </Group>
      </Container>
    </Header>
  );
}

export default NavigationHeader

