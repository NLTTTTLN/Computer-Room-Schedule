import { Tooltip } from "react-tooltip";
import { IconEdit, IconDelete } from "../../icon";
import DataTableUseCode from "../../DataTableUseCode";
import formatTimestamp from "../../../utils/formatTimestamp";
import jsUcfirst from "../../../utils/jsUcfirst";
import Swal from "sweetalert2";
export default function EmployeeTable({
  employees,
  handleSoftDelete,
  handleShowEditModal,
  isSelectAll,
  isSelected,
  handleSelectAll,
  handleSelected,
  currentPage,
  setCurrentPage,
  nextPage,
  prevPage,
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
            <p className="flex text-sm">{jsUcfirst(item.first_name)}</p>
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
            <p className="text-sm">{jsUcfirst(item.last_name)}</p>
          </div>
        );
      },
    },
    {
      field: "code",
      headerName: "Mã nhân viên",
      renderCell: (item) => {
        return <span className="text-sm">{item.code}</span>;
      },
    },
    {
      field: "phone_number",
      headerName: "Số điện thoại",
      renderCell: (item) => {
        return <span className="text-sm">{item.phone_number}</span>;
      },
    },
    {
      field: "created_at",
      headerName: "Ngày tham gia",
      renderCell: (item) => {
        return <span className="text-sm">{formatTimestamp(item.created_at)}</span>;
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
            {item.is_active === true ? (
              <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-black bg-slate-100">
                Còn làm
              </span>
            ) : (
              <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-500 bg-slate-100">
                Thôi làm
              </span>
            )}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Thao tác",
      renderCell: (item) => {
        return (
          <div className="flex justify-center items-center text-gray-400 gap-x-4">
            <button
              data-tooltip-id="edit"
              data-tooltip-content="Chỉnh sửa"
              className="hover:text-primary"
              onClick={() => handleShowEditModal(item.code)}
            >
              <IconEdit />
            </button>
            <Tooltip id="edit" style={{ backgroundColor: "var(--color-primary" }} />
            <button
              onClick={() => {
                Swal.fire({
                  title: "Bạn chắc chắn muốn xoá?",
                  text: "Nhân viên sẽ được chuyển vào thùng rác.",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#0E9F6E",
                  cancelButtonColor: "#d33",
                  cancelButtonText: "Huỷ bỏ",
                  confirmButtonText: "Đồng ý!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleSoftDelete(item.code);
                    Swal.fire({
                      title: "Đã chuyển vào thùng rác",
                      text: "Nhân viên đã được chuyển vào thùng rác.",
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
    <DataTableUseCode
      columnData={columnData}
      rowData={employees}
      select
      isSelectAll={isSelectAll}
      isSelected={isSelected}
      handleSelected={handleSelected}
      handleSelectAll={handleSelectAll}
      currentPage={currentPage}
      nextPage={nextPage}
      prevPage={prevPage}
      setCurrentPage={setCurrentPage}
      totalPageCount={totalPageCount}
      limitPerPage={limitPerPage}
      setLimitPerPage={setLimitPerPage}
    />
  );
}
