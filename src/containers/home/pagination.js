import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const items = [
  {
    id: 1,
    title: "Back End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 2,
    title: "Front End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 3,
    title: "User Interface Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote",
  },
];

export default function Example() {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-offset-2">
          Previous
        </button>
        <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-offset-2">
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 border border-gray-300 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-offset-2">
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button className="relative inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white border border-transparent rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-offset-2">
              1
            </button>
            <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-offset-2">
              2
            </button>
            <button className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-offset-2 md:inline-flex">
              3
            </button>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-offset-2">
              ...
            </span>
            <button className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-offset-2 md:inline-flex">
              8
            </button>
            <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-offset-2">
              9
            </button>
            <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-offset-2">
              10
            </button>
            <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 border border-gray-300 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-offset-2">
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
