import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addUser,
  deleteUser,
  deleteUsers,
  editUser,
  resetForm,
  setFormField,
  updateUser,
  User,
} from "./formTable.slice";

export const useFormTableViewModel = () => {
  const dispatch = useAppDispatch();
  const { form, users, editingId, errors } = useAppSelector(
    state => state.formTable
  );

  return {
    form,
    users,
    editingId,
    errors,
    handleChange: (field: keyof User, value: User[keyof User]) =>
      dispatch(setFormField({ field, value })),
    handleSubmit: () =>
      editingId ? dispatch(updateUser()) : dispatch(addUser()),
    edit: (id: string) => dispatch(editUser(id)),
    delete: (id: string) => dispatch(deleteUser(id)),
    deleteMany: (ids: string[]) => dispatch(deleteUsers(ids)),
    reset: () => dispatch(resetForm()),
  };
};
