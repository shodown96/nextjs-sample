"use server";
import prisma, { isPrismaError } from "@/lib/prisma";
import { constructResponse } from "@/lib/utils";
import { Response } from "@/types/common";
import { Participant } from "@prisma/client";

export const getParticipants = async (): Promise<Response<Participant[]>> => {
  try {
    const participants = await prisma.participant.findMany({});
    return constructResponse({
      code: 200,
      data: participants,
      message: "Success",
    });
  } catch (error) {
    console.error("Error to create participant", error);
    if (isPrismaError(error)) {
      return constructResponse({ code: 400, message: error.message });
    }
    return constructResponse({ code: 400, message: "Error" });
  }
};
