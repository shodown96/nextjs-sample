"use server";
import { ERROR_MESSAGES } from "@/lib/constants";
import prisma, { isPrismaError } from "@/lib/prisma";
import { constructResponse } from "@/lib/utils";
import { Response } from "@/types/common";
import { CreateParticipantRequest } from "@/types/participant";
import { Participant } from "@prisma/client";

export const createParticipant = async ({
  name,
  participation,
}: CreateParticipantRequest): Promise<Response<Participant>> => {
  try {
    const existingParticipant = await prisma.participant.findUnique({
      where: { name },
    });

    if (existingParticipant !== null) {
      return constructResponse({
        code: 400,
        message: ERROR_MESSAGES.ParticipantAlreadyExists,
      });
    }

    const participant = await prisma.participant.create({
      data: { name, participation },
    });

    return constructResponse({
      code: 201,
      data: participant,
      message: "Successfully added participant!",
    });
  } catch (error) {
    console.error("Error to create participant", error);
    if (isPrismaError(error)) {
      return constructResponse({ code: 400, message: error.message });
    }
    return constructResponse({ code: 400, message: `${error}` });
  }
};
