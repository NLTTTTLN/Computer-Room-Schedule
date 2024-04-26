import { Tooltip } from "react-tooltip";
import { IconEdit, IconDelete } from "../../icon";
import DataTable from "../../DataTable";
import formatTimestamp from "../../../utils/formatTimestamp";
import jsUcfirst from "../../../utils/jsUcfirst";
import Swal from "sweetalert2";
export default function LecturerTable({
  lecturers,
  handleSoftDelete,
  handleShowEditStaffModal,
  isSelectAll,
  isSelected,
  handleSelectAll,
  handleSelected,
  currentPage,
  setCurrentPage,
  totalPageCount,
  limitPerPage,
  setLimitPerPage,
  currentUser,
}) {
  const columnData = [
    {
      field: "first_name",
      headerName: "Họ",
      renderCell: (item) => {
        return (
          <div className="flex gap-x-2 items-center">
            <div className="w-[50px] h-[50px] ring-1 ring-gray-300">
              <img src={item.photo} className="w-full h-full object-cover" />
            </div>
  
            <p className="text-sm">{jsUcfirst(item.first_name)}</p>
            
          </div>
        );
      },
    },
    {
      field: "last_name",
      headerName: "Tên",
      renderCell: (item) => {
        return (
          <div className="flex gap-x-2 items-center">
            <div className="w-[50px] h-[50px] ring-1 ring-gray-300">
              <img src={item.photo} className="w-full h-full object-cover" />
            </div>
  
            <p className="text-sm">{jsUcfirst(item.last_name)}</p>
            
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      renderCell: (item) => {
        return <span className="text-sm">{item.email}</span>;
      },
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      renderCell: (item) => {
        return <span className="text-sm">{item.phone}</span>;
      },
    },
    {
      field: "joinDate",
      headerName: "Ngày tham gia",
      renderCell: (item) => {
        return <span className="text-sm">{formatTimestamp(item.createdAt)}</span>;
      },
    },
    {
      field: "role",
      headerName: "Chức vụ",
      renderCell: (item) => {
        return <span className="text-sm">{item.role === 1 ? "Quản lý" : "Nhân viên"}</span>;
      },
    },
    {
      field: "status",
      headerName: "Tình trạng",
      renderCell: (item) => {
        return (
          <div>
            {
              (item.is_active = true ? (
                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100">
                  Còn làm
                </span>
              ) : (
                <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-500 bg-slate-100">
                  Thôi làm
                </span>
              ))
            }
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Thao tác",
      renderCell: (item) => {
        return item._id === currentUser._id ? (
          ""
        ) : (
          <div className="flex justify-center items-center text-gray-400 gap-x-4">
            <button
              data-tooltip-id="edit"
              data-tooltip-content="Chỉnh sửa"
              className="hover:text-green-600"
              onClick={() => handleShowEditStaffModal(item)}
            >
              <IconEdit />
            </button>
            <Tooltip id="edit" style={{ backgroundColor: "var(--color-primary" }} />
            <button
              onClick={() => {
                Swal.fire({
                  title: "Bạn chắc chắn muốn xoá?",
                  text: "Giảng viên sẽ được chuyển vào thùng rác.",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#0E9F6E",
                  cancelButtonColor: "#d33",
                  cancelButtonText: "Huỷ bỏ",
                  confirmButtonText: "Đồng ý!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleSoftDelete(item._id);
                    Swal.fire({
                      title: "Đã chuyển vào thùng rác",
                      text: "Giảng viên đã được chuyển vào thùng rác.",
                      confirmButtonColor: "#0E9F6E",
                    });
                  }
                });
              }}
              data-tooltip-id="delete"
              data-tooltip-content="Xoá"
              className="hover:text-red-600"
            >
              <IconDelete />
            </button>
            <Tooltip id="delete" style={{ backgroundColor: "#EF4444" }} />
          </div>
        );
      },
    },
  ];

  return (
    <DataTable
      columnData={columnData}
      rowData={lecturers}
      select
      isSelectAll={isSelectAll}
      isSelected={isSelected}
      handleSelected={handleSelected}
      handleSelectAll={handleSelectAll}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPageCount={totalPageCount}
      limitPerPage={limitPerPage}
      setLimitPerPage={setLimitPerPage}
    />
  );
}