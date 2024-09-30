import { workflow } from "@novu/framework";
import { z } from "zod";

const workflowName = "notion-comment-notification";

// Define the workflow
export const notionCommentNotification = workflow(
  workflowName,
  async ({ step, payload, subscriber }) => {
    // Define the step for the workflow
    // -----------------------------------in-app step-------------------------------------------------------------------------
    await step.inApp(
      "in-app-step",
      async () => {
        const result: any = {
          subject: payload.inAppSubject,
          body: payload.inAppBody,
        };

        if (payload.showInAppAvatar) {
          result.avatar = payload.inAppAvatar;
        }

        if (payload.enablePrimaryAction) {
          result.primaryAction = {
            label: payload.inAppPrimaryActionLabel,
            url: payload.inAppPrimaryActionUrl,
          };
        }

        if (payload.enableSecondaryAction) {
          result.secondaryAction = {
            label: payload.inAppSecondaryActionLabel,
            url: payload.inAppSecondaryActionUrl,
          };
        }
        return result;
      },
    );
  },
  {
    payloadSchema: z.object({
      subscriberFirstName: z.string().default("John"),
      subscriberLastName: z.string().default("Doe"),
      inAppSubject: z
        .string()
        .default(
          `**${subscriber?.firstName} ${subscriber?.lastName} commented in**`
        ),
      inAppBody: z.string().default("Important Page"),
      inAppAvatar: z
        .string()
        .default("https://avatars.githubusercontent.com/u/63902456?v=4"),
      showInAppAvatar: z.boolean().default(true),
      inAppPrimaryActionLabel: z.string().default("Reply"),
      enablePrimaryAction: z.boolean().default(true),
      inAppPrimaryActionUrl: z.string().default("https://novu.com"),
      inAppSecondaryActionLabel: z.string().default("Dismiss"),
      enableSecondaryAction: z.boolean().default(false),
      inAppSecondaryActionUrl: z.string().default("https://novu.com"),
    }),
    tags: ["Comment"],
  }
);
