"use client";

import { getParticipants } from "@/actions/participant/get-participants";
import { Header, Loader, Pagination, Table } from "@/components";
import {
  generateHexColor,
  getFirstName,
  getLastName,
  paginateData,
} from "@/lib/utils";
import { Participant } from "@prisma/client";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { PaginatedData } from "@/types/common";
import toast from "react-hot-toast";
import { ERROR_MESSAGES } from "@/lib/constants";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filtered, setFiltered] = useState<PaginatedData<Participant> | null>(
    null,
  );
  const fetchParticipants = async (load = true) => {
    try {
      if (load) {
        setLoading(true);
      }
      const result = await getParticipants();
      if (result.data) {
        setParticipants(result.data);
        handlePageChange(1, result.data);
      }
    } catch (error) {
      toast.error(ERROR_MESSAGES.UnexpectedError);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (participants.length === 0) {
      fetchParticipants();
    }
  }, []);

  const handlePageChange = (page?: number, items = participants) => {
    const paginatedData = paginateData({ query: { page }, items });
    setFiltered(paginatedData);
  };

  return (
    <div>
      <Header fetchParticipants={fetchParticipants} />
      <Loader loading={loading}>
        <div className="p-10">
          <div className="text-center mb-10">
            <div>Participation Board</div>
            <div>Easily track data on participants here.</div>
          </div>
          <div className="flex justify-center items-center gap-10 max-lg:flex-col">
            <div>
              {filtered && filtered.items.length > 0 ? (
                <Table
                  columns={[
                    { label: "S/N", key: "sn" },
                    { label: "First name", key: "firstName" },
                    { label: "Last name", key: "lastName" },
                    {
                      label: "Participation",
                      key: "participation",
                      type: "percentage",
                    },
                  ]}
                  data={filtered.items.map((item) => ({
                    firstName: getFirstName(item.name),
                    lastName: getLastName(item.name),
                    participation: item.participation,
                    sn: participants.findIndex((p) => p.id == item.id) + 1,
                  }))}
                />
              ) : null}

              {filtered && filtered?.items?.length > 0 ? (
                <Pagination
                  items={filtered.items}
                  currentPage={filtered.currentPage}
                  pageSize={filtered.pageSize}
                  totalPages={filtered.totalPages}
                  totalItems={filtered.totalItems}
                  handlePageChange={(page) => {
                    handlePageChange(page);
                  }}
                />
              ) : null}
            </div>
            <Doughnut
              className="!h-[450px] !w-[450px] max-sm:!w-[300px] max-sm:!h-[300px]"
              data={{
                labels: participants.map((p) => p.name),
                datasets: [
                  {
                    data: participants.map((p) => p.participation),
                    backgroundColor: participants.map((p) =>
                      generateHexColor(p.participation),
                    ),
                  },
                ],
              }}
              options={{
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) =>
                        `Partcipation: ${tooltipItem.formattedValue}%`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </Loader>
    </div>
  );
}
