import { Tooltip } from "react-tooltip";
import { IconEdit, IconDelete, IconEye, IconView } from "../../icon";
import DataTableUseCode from "../../DataTableUseCode";
import formatTimestamp from "../../../utils/formatTimestamp";
import jsUcfirst from "../../../utils/jsUcfirst";
import Swal from "sweetalert2";
export default function ClassTable({
  classes,
  handleSoftDelete,
  handleShowEditModal,
  handleShowStudentList,
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
      field: "name",
      headerName: "Tên",
      renderCell: (item) => {
        return (
          <div className="flex gap-x-2 items-center">
            <p className="text-sm">{jsUcfirst(item.name)}</p>
          </div>
        );
      },
    },
    {
      field: "code",
      headerName: "Mã lớp",
      renderCell: (item) => {
        return <span className="text-sm">{item.code}</span>;
      },
    },
    {
      field: "lecturer_code",
      headerName: "Cố vấn học tập",
      renderCell: (item) => {
        return <span className="text-sm">{item.lecturer_code.first_name} {item.lecturer_code.last_name}</span>;
      },
    },
    {
      field: "created_at",
      headerName: "Ngày tạo",
      renderCell: (item) => {
        return <span className="text-sm">{formatTimestamp(item.created_at)}</span>;
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
                Còn hoạt động
              </span>
            ) : (
              <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-red-500 bg-slate-100">
                Ngưng hoạt động
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
              data-tooltip-id="view"
              data-tooltip-content="Xem danh sách sinh viên"
              className="hover:text-primary"
              onClick={() => handleShowStudentList(item.code)}
            >
              <IconView />
            </button>
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
                  text: "Lớp sẽ được chuyển vào thùng rác.",
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
                      text: "Lớp đã được chuyển vào thùng rác.",
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
      rowData={classes}
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
