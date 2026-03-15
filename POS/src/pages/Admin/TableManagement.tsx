// import React, { useState } from "react";
// import { FiPlus, FiEdit, FiXCircle, FiEye } from "react-icons/fi";


// import { useToast } from "../contexts/ToastContext";


// // --- API Client ---
// // Remove: const apiBaseURL = import.meta.env.VITE_API_BASE_URL || 'http://192.168.1.7:3000/api';
// // Remove: const apiHostURL = import.meta.env.VITE_API_HOST_URL || 'http://192.168.1.7:3000';

// // Remove: const apiClient = axios.create({
// // Remove:   baseURL: apiBaseURL,
// // Remove:   timeout: 10000,
// // Remove: });

// // --- Types ---
// type BusFormData = {
//   busName: string;
//   plateNumber: string;
//   isAssigned?: boolean;
// };

// const emptyBus: BusFormData = {
//   busName: "",
//   plateNumber: "",
//   isAssigned: false,
// };

// // --- Main Component ---
// const BusCRUD: React.FC = () => {
//   // Toast context for showing messages
//   const { showSuccess, showError, showWarning, showInfo } = useToast();

//   // Message modal state (if needed for modals)
//   // If you use a modal for messages, keep this, otherwise remove
//   // const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
//   // const [messageModalData, setMessageModalData] = useState<{ type: 'success' | 'error' | 'warning' | 'info'; title: string; message: string }>({ type: 'info', title: '', message: '' });

//   // Unified message handler for both modal and toast
//   const showMessageModal = (
//     type: "success" | "error" | "warning" | "info",
//     title: string,
//     message: string
//   ) => {
//     // If you want to use a modal, implement modal logic here
//     // Otherwise, use toast
//     switch (type) {
//       case "success":
//         showSuccess(title, message);
//         break;
//       case "error":
//         showError(title, message);
//         break;
//       case "warning":
//         showWarning(title, message);
//         break;
//       case "info":
//         showInfo(title, message);
//         break;
//     }
//   };

//   const {
//     buses,
//     loading,
//     validationErrors,
//     isModalOpen,
//     modalMode,
//     selectedBus,

//     currentPage,
//     searchTerm,
//     showAssignedOnly,
//     filteredBuses,
//     currentBuses,
//     totalPages,
//     handlePageChange,
//     handlePreviousPage,
//     handleNextPage,
//     handleSearchChange,
//     handleAssignedFilterChange,
//     clearFilters,
//     handleAddClick,
//     handleEditClick,
//     handleViewClick,
//     handleModalClose,
//     handleFormSubmit,
//     handleDelete,
//     handleConfirmDelete,
//     setValidationErrors,
//     indexOfFirstItem,
//     indexOfLastItem,
//     setBusActiveStatus,
//     statusFilter,
//     handleStatusFilterChange,
//   } = useBusController(showMessageModal);

//   // const handleRetryConnection = () => {
//   //   showMessageModal('info', 'Retrying Connection', 'Attempting to reconnect to the server...');
//   //   fetchBuses();
//   // };

//   return (
//     <div className="p-2">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
//           Bus Management
//         </h1>
//         <Button onClick={handleAddClick} className="flex items-center gap-2">
//           <FiPlus /> Add Bus
//         </Button>
//       </div>
//       {/* Search and Filter Controls */}
//       <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4 mb-4 shadow-sm">
//         <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
//           {/* Search Bar */}
//           <div className="flex-1 max-w-md">
//             <label
//               htmlFor="search"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//             >
//               Search Buses
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 id="search"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 placeholder="Search by bus name or plate number..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
//               />
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <svg
//                   className="h-4 w-4 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>
//           {/* Filter Controls */}
//           <div className="flex items-center gap-4">
//             {/* Assigned Filter */}
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="assignedFilter"
//                 checked={showAssignedOnly}
//                 onChange={handleAssignedFilterChange}
//                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//               />
//               <label
//                 htmlFor="assignedFilter"
//                 className="text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 Show Assigned Only
//               </label>
//             </div>
//             {/* Status Filter (now immediately after Assigned Filter) */}
//             <div className="flex items-center space-x-2">
//               <label
//                 htmlFor="statusFilter"
//                 className="text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 Status
//               </label>
//               <select
//                 id="statusFilter"
//                 value={statusFilter}
//                 onChange={handleStatusFilterChange}
//                 className="px-2 py-1 rounded border border-gray-300 text-sm bg-white dark:bg-gray-700 dark:text-white"
//               >
//                 <option value="all">All</option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>
//             </div>
//             {(searchTerm || showAssignedOnly || statusFilter !== "active") && (
//               <button
//                 onClick={clearFilters}
//                 className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//               >
//                 Clear Filters
//               </button>
//             )}
//           </div>
//         </div>
//         {filteredBuses.length !== buses.length && (
//           <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
//             Showing {filteredBuses.length} of {buses.length} buses
//             {searchTerm && ` matching "${searchTerm}"`}
//             {showAssignedOnly && " (assigned only)"}
//           </div>
//         )}
//       </div>
//       <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm overflow-hidden">
//         {loading ? (
//           <div className="p-6 text-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
//             <p className="text-gray-600 dark:text-gray-400">Loading buses...</p>
//           </div>
//         ) : buses.length === 0 ? (
//           <div className="p-8 flex flex-col items-center justify-center text-center">
//             <div className="text-6xl mb-4">🚌</div>
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
//               No Buses Registered
//             </h2>
//             <p className="text-gray-600 dark:text-gray-400 mb-4">
//               It looks like there are currently no buses in the system.
//               <br />
//               Click below to add your first bus!
//             </p>
//             <Button onClick={handleAddClick} className="px-4 py-2">
//               <span className="mr-2">+</span> Add Bus
//             </Button>
//           </div>
//         ) : (
//           <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-400">
//               <tr>
//                 <th scope="col" className="px-6 py-3">
//                   Bus Name
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Plate Number
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Status
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Assigned
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-right">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentBuses.map((bus: Bus) => (
//                 <tr
//                   key={bus.id}
//                   className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/50"
//                 >
//                   <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                     {bus.busName}
//                   </td>
//                   <td className="px-6 py-4">{bus.plateNumber}</td>
//                   <td className="px-6 py-4">
//                     <select
//                       value={bus.isActive ? "active" : "inactive"}
//                       onChange={async (e) => {
//                         const newStatus = e.target.value === "active";
//                         await setBusActiveStatus(bus.id, newStatus);
//                       }}
//                       className={`px-2 py-1 rounded border border-gray-300 text-xs transition-colors duration-200 focus:ring-2 focus:ring-yellow-400
//                         ${
//                           bus.isActive
//                             ? "bg-green-100 text-green-800 border-green-300"
//                             : "bg-red-100 text-red-700 border-red-300"
//                         }
//                         hover:border-yellow-400 dark:bg-gray-700 dark:text-white`}
//                       style={{ minWidth: 90 }}
//                       title="Change Status"
//                     >
//                       <option
//                         value="active"
//                         className="text-green-800 bg-green-100"
//                       >
//                         Active
//                       </option>
//                       <option
//                         value="inactive"
//                         className="text-red-700 bg-red-100"
//                       >
//                         Inactive
//                       </option>
//                     </select>
//                   </td>
//                   <td className="px-6 py-4">
//                     {bus.isAssigned ? (
//                       <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400">
//                         Assigned
//                       </span>
//                     ) : (
//                       <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400">
//                         Not Assigned
//                       </span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4 text-right">
//                     <button
//                       onClick={() => handleEditClick(bus)}
//                       className="p-2 rounded-full mr-2 transition-colors duration-200 hover:bg-yellow-300/60 hover:text-black focus:ring-2 focus:ring-yellow-400"
//                       title="Edit"
//                     >
//                       <FiEdit />
//                     </button>
//                     <button
//                       onClick={() => handleViewClick(bus)}
//                       className="p-2 rounded-full mr-2 transition-colors duration-200 hover:bg-yellow-200/60 hover:text-black focus:ring-2 focus:ring-yellow-400"
//                       title="View"
//                     >
//                       <FiEye />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//       {!loading && filteredBuses.length > 0 && (
//         <div className="mt-4 flex items-center justify-between">
//           <div className="text-sm text-gray-700 dark:text-gray-300">
//             Showing {indexOfFirstItem + 1} to{" "}
//             {Math.min(indexOfLastItem, filteredBuses.length)} of{" "}
//             {filteredBuses.length} buses
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={handlePreviousPage}
//               disabled={currentPage === 1}
//               className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
//                 currentPage === 1
//                   ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
//                   : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
//               }`}
//             >
//               Previous
//             </button>
//             <div className="flex items-center space-x-1">
//               {Array.from({ length: totalPages }, (_, index) => index + 1).map(
//                 (pageNumber) => {
//                   const shouldShow =
//                     pageNumber === 1 ||
//                     pageNumber === totalPages ||
//                     (pageNumber >= currentPage - 1 &&
//                       pageNumber <= currentPage + 1);
//                   if (!shouldShow) {
//                     if (
//                       pageNumber === currentPage - 2 ||
//                       pageNumber === currentPage + 2
//                     ) {
//                       return (
//                         <span
//                           key={`ellipsis-${pageNumber}`}
//                           className="px-2 py-1 text-gray-500"
//                         >
//                           ...
//                         </span>
//                       );
//                     }
//                     return null;
//                   }
//                   return (
//                     <button
//                       key={pageNumber}
//                       onClick={() => handlePageChange(pageNumber)}
//                       className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
//                         pageNumber === currentPage
//                           ? "bg-blue-500 text-white"
//                           : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
//                       }`}
//                     >
//                       {pageNumber}
//                     </button>
//                   );
//                 }
//               )}
//             </div>
//             <button
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//               className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
//                 currentPage === totalPages
//                   ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
//                   : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//       {isModalOpen && (
//         <BusModal
//           mode={modalMode}
//           bus={selectedBus}
//           onClose={handleModalClose}
//           onSubmit={handleFormSubmit}
//           showWarning={(title: string, message?: string) =>
//             showMessageModal("warning", title, message || "")
//           }
//           validationErrors={validationErrors}
//           setValidationErrors={setValidationErrors}
//         />
//       )}
//     </div>
//   );
// };

// // --- Modal and Form Component ---
// interface BusModalProps {
//   mode: "add" | "edit" | "view";
//   bus: Bus | null;
//   onClose: () => void;
//   onSubmit: (data: BusFormData, id?: string) => void;
//   showWarning: (title: string, message?: string) => void;
//   validationErrors: { [key: string]: string };
//   setValidationErrors: (errors: { [key: string]: string }) => void;
// }

// const BusModal: React.FC<BusModalProps> = ({
//   mode,
//   bus,
//   onClose,
//   onSubmit,

//   validationErrors,
//   setValidationErrors,
// }) => {
//   const [formData, setFormData] = useState<BusFormData>(
//     bus
//       ? {
//           busName: bus.busName,
//           plateNumber: bus.plateNumber,
//           isAssigned: bus.isAssigned,
//         }
//       : emptyBus
//   );

//   const renderField = (
//     name: string,
//     label: string,
//     type: string = "text",
//     required: boolean = true,
//     additionalProps: Record<string, unknown> = {}
//   ) => {
//     const hasError = validationErrors[name];
//     return (
//       <div>
//         <label
//           className={`block text-xs font-medium mb-1 ${
//             hasError
//               ? "text-red-600 dark:text-red-400"
//               : "text-gray-700 dark:text-gray-300"
//           }`}
//         >
//           {label} {required && "*"}
//         </label>
//         <input
//           type={type}
//           name={name}
//           value={(formData[name as keyof BusFormData] as string) || ""}
//           onChange={handleChange}
//           className={`w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
//             hasError
//               ? "border-red-500 focus:ring-red-500 focus:border-red-500"
//               : "border-gray-300 dark:border-gray-600"
//           }`}
//           {...additionalProps}
//         />
//         {hasError && (
//           <p className="text-xs text-red-600 dark:text-red-400 mt-1">
//             {hasError}
//           </p>
//         )}
//       </div>
//     );
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value, type } = e.target;
//     const checked = (e.target as HTMLInputElement).checked;
//     const newFormData = {
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     };
//     setFormData(newFormData);

//     // Clear validation error for this field when user starts typing
//     if (validationErrors[name]) {
//       const newErrors = { ...validationErrors };
//       delete newErrors[name];
//       setValidationErrors(newErrors);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Simple validation - check each field individually
//     const errors: { [key: string]: string } = {};

//     // Check required fields
//     if (!formData.busName || formData.busName.trim() === "") {
//       errors.busName = "Bus name is required";
//     }

//     if (!formData.plateNumber || formData.plateNumber.trim() === "") {
//       errors.plateNumber = "Plate number is required";
//     } else {
//       // Basic plate number validation - should be at least 3 characters
//       if (formData.plateNumber.trim().length < 3) {
//         errors.plateNumber = "Plate number must be at least 3 characters";
//       }
//     }

//     // If there are validation errors, set them and return
//     if (Object.keys(errors).length > 0) {
//       setValidationErrors(errors);
//       return;
//     }

//     // Clear any existing validation errors
//     setValidationErrors({});

//     // Submit the form
//     onSubmit(formData, bus?.id);
//   };

//   return (
//     <Overlay onClick={onClose}>
//       <div
//         className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl m-auto mt-8 p-4 pb-6 transform transition-all duration-300 scale-100"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center justify-between mb-3">
//           <h2 className="text-lg font-bold text-gray-800 dark:text-white">
//             {mode === "add"
//               ? "Add New Bus"
//               : mode === "edit"
//               ? "Update Bus"
//               : "Bus Details"}
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
//           >
//             <FiXCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
//           </button>
//         </div>
//         {mode === "view" ? (
//           <div className="space-y-4">
//             <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
//                   <span className="text-2xl">🚌</span>
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-800 dark:text-white">
//                     {bus?.busName}
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-400">
//                     {bus?.plateNumber}
//                   </p>
//                   <div className="flex items-center gap-2 mt-1">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         bus?.isAssigned
//                           ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400"
//                           : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400"
//                       }`}
//                     >
//                       {bus?.isAssigned ? "Assigned" : "Not Assigned"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
//                 <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
//                   Bus Information
//                 </h4>
//                 <div className="space-y-2">
//                   <div>
//                     <span className="text-xs text-gray-500 dark:text-gray-400">
//                       Bus Name
//                     </span>
//                     <p className="text-sm font-medium text-gray-800 dark:text-white">
//                       {bus?.busName}
//                     </p>
//                   </div>
//                   <div>
//                     <span className="text-xs text-gray-500 dark:text-gray-400">
//                       Plate Number
//                     </span>
//                     <p className="text-sm font-medium text-gray-800 dark:text-white">
//                       {bus?.plateNumber}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
//                 <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
//                   Status Information
//                 </h4>
//                 <div className="space-y-2">
//                   <div>
//                     <span className="text-xs text-gray-500 dark:text-gray-400">
//                       Assignment Status
//                     </span>
//                     <p className="text-sm font-medium text-gray-800 dark:text-white">
//                       {bus?.isAssigned
//                         ? "Currently Assigned"
//                         : "Available for Assignment"}
//                     </p>
//                   </div>
//                   <div>
//                     <span className="text-xs text-gray-500 dark:text-gray-400">
//                       Bus ID
//                     </span>
//                     <p className="text-sm font-medium text-gray-800 dark:text-white font-mono">
//                       {bus?.id}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-3">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {renderField("busName", "Bus Name", "text", true, {
//                 placeholder: "Enter bus name",
//                 maxLength: 50,
//               })}
//               {renderField("plateNumber", "Plate Number", "text", true, {
//                 placeholder: "Enter plate number (e.g., ABC-123)",
//                 maxLength: 20,
//               })}
//               {mode === "edit" && (
//                 <div className="md:col-span-2">
//                   <div className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       id="isAssigned"
//                       name="isAssigned"
//                       checked={formData.isAssigned || false}
//                       onChange={handleChange}
//                       className="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                     />
//                     <label
//                       htmlFor="isAssigned"
//                       className="text-xs font-medium text-gray-700 dark:text-gray-300"
//                     >
//                       Is Assigned to Route
//                     </label>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="flex justify-end gap-2 pt-3 pb-2 border-t border-gray-200 dark:border-gray-700">
//               <Button
//                 type="button"
//                 variant="secondary"
//                 onClick={onClose}
//                 className="px-3 py-1.5 text-xs"
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" className="px-3 py-1.5 text-xs">
//                 Save
//               </Button>
//             </div>
//           </form>
//         )}
//       </div>
//     </Overlay>
//   );
// };

// export default BusCRUD;
