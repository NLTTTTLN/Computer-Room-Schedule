import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import EmployeeTable from "../../components/employee/employeeTable";
import EmployeeDeletedTable from "../../components/employee/employeeDeletedTable";
import { IconBin, IconAdd, IconDelete, IconBack, IconRestore } from "../../components/icon";
import PageLayout from "../../components/layout/pageLayout";

import { useSelector } from "react-redux";

export default function Subject() {
  const [subjects, setSubjects] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isSelected, setIsSelected] = useState([]);
  const [isShowDeletedTable, setIsShowDeletedTable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const handleSelectAll = () => {
    setIsSelectAll(!isSelectAll);
    //setIsSelected(staffs.map((staff) => staff._id));
    if (isSelectAll) {
      setIsSelected([]);
    }
  };
  const handleSelected = (event) => {
    const { id, checked } = event.target;
    setIsSelected([...isSelected, id]);
    if (!checked) {
      setIsSelected(isSelected.filter((staffId) => staffId !== id));
    }
  };

  return (
    <PageLayout title="Môn học">
      <div className="bg-white rounded-lg ring-1 ring-gray-200 ring-opacity-4 overflow-hidden mb-5 shadow-xs">
        <div className="p-4">
          <div className="flex justify-end items-center py-3 gap-x-4">
            {isShowDeletedTable ? (
              <React.Fragment>
                <button
                  disabled={isSelected.length <= 0}
                  onClick={() => {
                    Swal.fire({
                      title: "Bạn chắc chắn muốn khôi phục?",
                      text: "Các môn học sẽ được khôi phục.",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#0E9F6E",
                      cancelButtonColor: "#d33",
                      cancelButtonText: "Huỷ bỏ",
                      confirmButtonText: "Đồng ý!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        //handleRestoreManyStaff();
                        Swal.fire({
                          title: "Đã Khôi phục",
                          text: "Các môn học đã được khôi phục.",
                          confirmButtonColor: "#0E9F6E",
                        });
                      }
                    });
                  }}
                  className={`h-12 align-bottom inline-flex leading-5 items-center justify-center 
                        transition-colors duration-150 font-medium px-10 py-2 rounded-lg text-sm 
                        text-white border border-transparent ${
                          isSelected.length > 0 ? "bg-yellow-400 cursor-pointer" : "bg-yellow-200 cursor-not-allowed"
                        }`}
                >
                  <span className="mr-3">
                    <IconRestore />
                  </span>
                  Khôi phục
                </button>

                <button
                  disabled={isSelected.length <= 0}
                  onClick={() => {
                    Swal.fire({
                      title: "Bạn chắc chắn muốn xoá?",
                      text: "Các môn học sẽ được xoá và không thể khôi phục.",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#0E9F6E",
                      cancelButtonColor: "#d33",
                      cancelButtonText: "Huỷ bỏ",
                      confirmButtonText: "Đồng ý!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        //handleDeleteManyStaff();
                        Swal.fire({
                          title: "Đã xoá",
                          text: "Các môn học đã được xoá.",
                          confirmButtonColor: "#0E9F6E",
                        });
                      }
                    });
                  }}
                  className={`h-12 align-bottom inline-flex leading-5 items-center justify-center 
                        transition-colors duration-150 font-medium px-10 py-2 rounded-lg text-sm 
                        text-white border border-transparent ${
                          isSelected.length > 0 ? "bg-red-600 cursor-pointer" : "bg-red-300 cursor-not-allowed"
                        }`}
                >
                  <span className="mr-3">
                    <IconDelete />
                  </span>
                  Xoá
                </button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <button
                  disabled={isSelected.length <= 0}
                  onClick={() => {
                    Swal.fire({
                      title: "Bạn chắc chắn muốn xoá?",
                      text: "Các môn học sẽ được chuyển vào thùng rác.",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#0E9F6E",
                      cancelButtonColor: "#d33",
                      cancelButtonText: "Huỷ bỏ",
                      confirmButtonText: "Đồng ý!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        //handleSoftDeleteManyStaff();
                        Swal.fire({
                          title: "Đã chuyển vào thùng rác",
                          text: "Các môn học đã được chuyển vào thùng rác.",
                          confirmButtonColor: "#0E9F6E",
                        });
                      }
                    });
                  }}
                  className={`h-12 align-bottom inline-flex leading-5 items-center justify-center 
                        transition-colors duration-150 font-medium px-10 py-2 rounded-lg text-sm 
                        text-white border border-transparent ${
                          isSelected.length > 0 ? "bg-red-600 cursor-pointer" : "bg-red-300 cursor-not-allowed"
                        }`}
                >
                  <span className="mr-3">
                    <IconDelete />
                  </span>
                  Xoá
                </button>
              </React.Fragment>
            )}

            <button
              className="h-12 align-bottom inline-flex leading-5 items-center justify-center 
                        cursor-pointer transition-colors duration-150 font-medium px-4 py-2 rounded-lg text-sm 
                        text-white bg-primary border border-transparent hover:bg-[#a41c15] "
              //onClick={handleShowAddModal}
            >
              <span className="mr-3">
                <IconAdd />
              </span>
              Thêm môn học
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end mb-5 px-[20px]"></div>
      {isShowDeletedTable ? (
        <React.Fragment>
          <h1 className="text-black font-bold mb-5">Thùng rác</h1>
          <EmployeeDeletedTable
            subjects={subjects}
            //handleDelete={handleDeleteStaff}
            //handleRestore={handleRestoreStaff}
            handleSelected={handleSelected}
            isSelected={isSelected}
            handleSelectAll={handleSelectAll}
            isSelectAll={isSelectAll}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPageCount={totalPageCount}
            limitPerPage={limitPerPage}
            setLimitPerPage={setLimitPerPage}
            currentUser={currentUser}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h1 className="text-black font-bold mb-5">Danh sách</h1>
          <EmployeeTable
            subjects={subjects}
            //handleSoftDelete={handleSoftDeleteStaff}
            //handleShowEditStaffModal={handleShowEditStaffModal}
            isSelectAll={isSelectAll}
            isSelected={isSelected}
            handleSelectAll={handleSelectAll}
            handleSelected={handleSelected}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPageCount={totalPageCount}
            limitPerPage={limitPerPage}
            setLimitPerPage={setLimitPerPage}
            currentUser={currentUser}
          />
        </React.Fragment>
      )}
    </PageLayout>
  );
}