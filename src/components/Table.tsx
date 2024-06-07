import React from "react";

export default function Table({
  columns,
  data,
  seralize = false,
}: {
  columns: { label: string; key: string; type?: string }[];
  data: any[];
  seralize?: boolean;
}) {
  return (
    <div className="overflow-x-auto max-sm:w-[300px] min-h-[270px]">
      <table role="table">
        <thead className="border border-gray-300">
          <tr>
            {seralize ? <th className="p-4 bg-gray-300">S/N</th> : null}

            {columns.map((col, i) => (
              <th key={i} className="p-4 bg-gray-300">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="border-x border-b border-gray-300">
          {data.length > 0 ? (
            data.map((item, i) => (
              <tr key={i} className="border-b border-gray-300">
                {seralize ? <td className="py-2 px-4">{i + 1}</td> : null}

                {columns.map((col, j) => (
                  <td key={j} className="py-2 px-4">
                    {item[col.key]}
                    {col.type === "percentage" ? "%" : ""}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="text-center p-2"
                colSpan={seralize ? columns.length + 1 : columns.length}
              >
                No data yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
