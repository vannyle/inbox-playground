"use client";
import {
  VStack,
  Flex,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import InboxDesignForm from "./InboxDesignForm";
import NotificationContentForm from "./NotificationContentForm";
import { useNotificationForm } from "../hooks/useNotificationForm";
import { useDesignDashboard } from "../hooks/useDesignDashboard";
import { useSubscriber } from "../hooks/useSubscriber";
import { LinearIcon } from "./icons/Linear";
import { NotionIcon } from "./icons/Notion";
import { HackerNewsIcon } from "./icons/HackerNews";

export interface Workflow {
  id: string;
  title: string;
}

const themes = [
  {
    id: "linear",
    title: "Linear",
    icon: <LinearIcon />,
    workflows: [
      {
        id: "1",
        title: "Mention in a Comment",
      },
      {
        id: "2",
        title: "Project Updates",
      },
      {
        id: "3",
        title: "Status Change",
      },
    ],
  },
  {
    id: "notion",
    title: "Notion",
    icon: <NotionIcon />,
    workflows: [
      {
        id: "1",
        title: "Workflow 1",
      },
    ],
  },
  {
    id: "reddit",
    title: "Reddit",
    icon: <NotionIcon />,
    workflows: [
      {
        id: "1",
        title: "Workflow 1",
      },
    ],
  },
  {
    id: "hn",
    title: "Hacker News",
    icon: <HackerNewsIcon />,
    workflows: [
      {
        id: "1",
        title: "Workflow 1",
      },
    ],
  },
];

const PlaygroundFormContainer = () => {
  const { notificationFormState, handleNotificationFormChange, handleSubmit } =
    useNotificationForm();
  const { showDesignDashboard, handleToggleDesignDashboard } =
    useDesignDashboard();
  useSubscriber();

  return (
    <Flex
      width="100%"
      maxW="600px"
      borderWidth="1px"
      borderRadius="lg"
      padding={3}
      boxShadow="lg"
      bg="white"
      height="100%"
      minHeight="400px"
      direction="column"
    >
      <VStack spacing={4} alignItems="stretch" flexGrow={1} height="100%">
        {showDesignDashboard ? (
          <InboxDesignForm />
        ) : (
          <Tabs height="calc(100% - 80px)">
            <TabList>
              {themes.map((theme) => (
                <Tab
                  key={theme.id}
                  sx={{
                    svg: {
                      width: "20px",
                      height: "20px",
                    },
                  }}
                >
                  <span
                    style={{ marginRight: "10px", display: "inline-block" }}
                  >
                    {theme.icon}
                  </span>
                  {theme.title}
                </Tab>
              ))}
            </TabList>
            <TabPanels height="calc(100% - 30px)">
              {themes.map((theme) => (
                <TabPanel key={theme.id} height="100%" overflowY="auto">
                  <NotificationContentForm
                    workflows={theme.workflows}
                    notificationFormState={notificationFormState}
                    handleNotificationFormChange={handleNotificationFormChange}
                  />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        )}

        <Button
          colorScheme="blue"
          size="md"
          width="full"
          marginTop={4}
          onClick={handleSubmit}
          alignSelf="flex-end"
        >
          Send Notification
        </Button>
      </VStack>
    </Flex>
  );
};

export default PlaygroundFormContainer;
