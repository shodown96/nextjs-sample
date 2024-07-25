import { VALIDATION_MESSAGES } from "@/lib/constants";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const ParticipantParams = z
  .object({
    firstName: z.string({
      required_error: VALIDATION_MESSAGES.FirstNameRequired,
    }),
    lastName: z.string({
      required_error: VALIDATION_MESSAGES.LastNameRequired,
    }),
    participation: z.number().nonnegative({
      message: VALIDATION_MESSAGES.NonNegativeNumber
    }).optional(),
  })
  .refine(
    (values) => values.firstName && values.lastName && values.participation,
    {
      message: VALIDATION_MESSAGES.ParticipationRequired,
      path: ["participation"],
    },
  );

export const ParticipantParamsSchema =
  toFormikValidationSchema(ParticipantParams);
export type ParticipantParamsType = z.infer<typeof ParticipantParams>;
