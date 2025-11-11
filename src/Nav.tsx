import { useState } from "react";

type DirectoryTree = Record<string, Record<string, Array<string>>>;

function Navigator({ directoryTree }: { directoryTree: DirectoryTree }) {
  return (
    <nav className="w-54 h-full bg-grayscale-2 border-r border-grayscale-6 rounded-xl p-2">
      <ul>
        {Object.entries(directoryTree)
          .sort()
          .reverse()
          .map(([year, monthlyRecord]) => (
            <YearlyList year={year} monthlyRecord={monthlyRecord} />
          ))}
      </ul>
    </nav>
  );
}

function YearlyList({
  year,
  monthlyRecord,
}: {
  year: string;
  monthlyRecord: Record<string, Array<string>>;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <li>
      <div
        className="cursor-pointer hover:bg-grayscale-4 active:bg-grayscale-5 w-full ps-2 py-0.5 rounded-md"
        onClick={() => setExpanded((prev) => !prev)}
      >
        {year}
      </div>
      {expanded && (
        <ul>
          {Object.entries(monthlyRecord)
            .sort()
            .map(([month, dailyRecord]) => (
              <MonthlyList month={month} dailyRecord={dailyRecord} />
            ))}
        </ul>
      )}
    </li>
  );
}

function MonthlyList({
  month,
  dailyRecord,
}: {
  month: string;
  dailyRecord: Array<string>;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <li>
      <div
        className="cursor-pointer hover:bg-grayscale-4 active:bg-grayscale-5 w-full ps-4 py-0.5 rounded-md"
        onClick={() => setExpanded((prev) => !prev)}
      >
        {month}
      </div>
      {expanded && (
        <ul>
          {dailyRecord.sort().map((date) => (
            <DailyList date={date} />
          ))}
        </ul>
      )}
    </li>
  );
}

function DailyList({ date }: { date: string }) {
  return (
    <li className="cursor-pointer hover:bg-grayscale-4 active:bg-grayscale-5 w-full ps-6 py-0.5 rounded-md">
      {date}
    </li>
  );
}

export { Navigator, type DirectoryTree };
