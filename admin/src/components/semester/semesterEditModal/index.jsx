import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Drawer from "../../modal/drawer";
import ModalHeader from "../../modal/header";
import ModalFooter from "../../modal/footer";
import { useForm } from "react-hook-form";
import yup from "../../../utils/yupGlobal";
import toastMessage from "../../../utils/toastMessage";
import styles from "./styles.module.css";

export default function EditModalSemester({ haveCloseModal = true, closeModal, title, titleBtnFooter, handleUpdateSemester, editSemester }) {
  const schema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên học kỳ."),
    start_time: yup.date().required("Vui lòng nhập ngày bắt đầu."),
    end_time: yup.date().required("Vui lòng nhập ngày kết thúc."),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await handleUpdateSemester(editSemester.id, data);
      toastMessage({ type: "success", message: "Cập nhật thành công." });
    } catch (error) {
      toastMessage({ type: "error", message: `Cập nhật thất bại. ${error}.` });
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  return (
    <div>
      <div onClick={closeModal} className={`bg-black/30 top-0 right-0 left-0 w-full h-full fixed `}></div>
      <Drawer isFullWidth={haveCloseModal} closeModal={closeModal} title={title} titleBtnFooter={titleBtnFooter}>
        {haveCloseModal ? <ModalHeader closeModal={closeModal} title={title} /> : null}

        <div className={`h-full mt-[20px] ${haveCloseModal ? "overflow-y-scroll grow" : ""}`}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`${styles.item}`}>
              <div className="w-1/3 text-sm text-gray-700 font-medium dark:text-gray-400">
                <label>Tên học kỳ</label>
              </div>
              <div className="flex flex-col w-2/3">
                <input
                  defaultValue={editSemester.name}
                  type="text"
                  placeholder="Nhập tên học kỳ"
                  className={`${
                    errors.name ? "border-red-500" : ""
                  } block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none`}
                  {...register("name")}
                />
                {errors.name && <p className="text-red-500 text-sm">{`*${errors.name.message}`}</p>}
              </div>
            </div>
            <div className={`${styles.item}`}>
              <div className="w-1/3 text-sm text-gray-700 font-medium dark:text-gray-400">
                <label>Ngày bắt đầu</label>
              </div>
              <div className="flex flex-col w-2/3">
                <input
                  type="date"
                  defaultValue={editSemester.start_time}
                  onChange={(e) => setValue("start_time", e.target.value)}
                  className={` ${errors.start_time ? "border-red-500" : ""} block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none`}
                />
                {errors.start_time && <p className="text-red-500 text-sm">{`*${errors.start_time.message}`}</p>}
              </div>
            </div>
            <div className={`${styles.item}`}>
              <div className="w-1/3 text-sm text-gray-700 font-medium dark:text-gray-400">
                <label>Ngày kết thúc</label>
              </div>
              <div className="flex flex-col w-2/3">
                <input
                  type="date"
                  defaultValue={editSemester.end_time}
                  onChange={(e) => setValue("end_time", e.target.value)}
                  className={` ${errors.end_time ? "border-red-500" : ""} block w-full px-3 py-1 text-sm h-12 rounded-md bg-gray-100 focus:bg-gray-50 border-[1px] focus:bg-transparent focus:outline-none`}
                />
                {errors.end_time && <p className="text-red-500 text-sm">{`*${errors.end_time.message}`}</p>}
              </div>
            </div>
            <input type="submit" hidden id="send" disabled={isLoading} />
          </form>
        </div>
        <ModalFooter title={titleBtnFooter} isLoading={isLoading} />
      </Drawer>
    </div>
  );
}
