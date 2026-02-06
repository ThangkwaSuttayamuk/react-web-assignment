import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  title?: string;
  firstname?: string;
  lastname?: string;
  birthday?: string;
  nationality?: string;
  citizenId: string;
  gender?: string;
  countryCode?: string;
  phone?: string;
  passportNo: string;
  expectedSalary?: number;
}

interface FormTableState {
  form: Partial<User>;
  users: User[];
  editingId: string | null;
  errors: Partial<Record<keyof User, string>>;
  isValid: boolean;
  hasSubmitted: boolean;
}

const loadUsers = (): User[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
};

const initialState: FormTableState = {
  form: {},
  users: loadUsers(),
  editingId: null,
  errors: {},
  isValid: false,
  hasSubmitted: false,
};

const requiredFields: Array<{ field: keyof User; label: string }> = [
  { field: "title", label: "Title" },
  { field: "firstname", label: "Firstname" },
  { field: "lastname", label: "Lastname" },
  { field: "birthday", label: "Birthday" },
  { field: "nationality", label: "Nationality" },
  { field: "gender", label: "Gender" },
  { field: "countryCode", label: "Country Code" },
  { field: "phone", label: "Phone" },
  { field: "expectedSalary", label: "Expected Salary" },
];

const validateForm = (state: FormTableState) => {
  const errors: Partial<Record<keyof User, string>> = {};

  requiredFields.forEach(({ field, label }) => {
    const value = state.form[field];
    const isEmpty = value === undefined || value === null || value === "";
    if (isEmpty) {
      errors[field] = `${label} is required`;
    }
  });

  if (state.form.phone !== undefined && state.form.phone !== null) {
    const phoneDigits = state.form.phone;
    if (!/^[0-9]{10}$/.test(phoneDigits)) {
      errors.phone = "Phone must be 10 digits";
    }
  }

  if (state.form.passportNo) {
    if (!/^[A-Z0-9]{9}$/.test(state.form.passportNo)) {
      errors.passportNo =
        "Passport No must be 9 characters (A-Z or 0-9)";
    }
  }

  if (state.form.citizenId) {
    if (!/^[0-9]{13}$/.test(state.form.citizenId)) {
      errors.citizenId = "Citizen ID must be 13 digits";
    }
  }

  state.errors = errors;
  state.isValid = Object.keys(errors).length === 0;
};

const formTableSlice = createSlice({
  name: "formTable",
  initialState,
  reducers: {
    setFormField(
      state,
      action: PayloadAction<{
        field: keyof User;
        value: User[keyof User];
      }>
    ) {
      state.form = {
        ...state.form,
        [action.payload.field]: action.payload.value,
      } as Partial<User>;

      if (state.hasSubmitted) {
        validateForm(state);
      }
    },

    resetForm(state) {
      state.form = {};
      state.editingId = null;
      state.errors = {};
      state.isValid = false;
      state.hasSubmitted = false;
    },

    addUser(state) {
      state.hasSubmitted = true;
      validateForm(state);
      if (!state.isValid) return;

      const newUser: User = {
        ...(state.form as User),
        id: Date.now().toString(),
      };

      state.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.users));
      state.form = {};
      state.errors = {};
      state.isValid = false;
      state.hasSubmitted = false;
    },

    editUser(state, action: PayloadAction<string>) {
      const user = state.users.find(u => u.id === action.payload);
      if (user) {
        state.form = user;
        state.editingId = user.id;
        state.errors = {};
        state.isValid = true;
        state.hasSubmitted = false;
      }
    },

    updateUser(state) {
      state.hasSubmitted = true;
      validateForm(state);
      if (!state.isValid) return;

      state.users = state.users.map(user =>
        user.id === state.editingId
          ? { ...(state.form as User) }
          : user
      );

      localStorage.setItem("users", JSON.stringify(state.users));
      state.form = {};
      state.editingId = null;
      state.errors = {};
      state.isValid = false;
      state.hasSubmitted = false;
    },

    deleteUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter(
        u => u.id !== action.payload
      );

      localStorage.setItem("users", JSON.stringify(state.users));
    },

    deleteUsers(state, action: PayloadAction<string[]>) {
      const ids = new Set(action.payload);
      state.users = state.users.filter(u => !ids.has(u.id));
      localStorage.setItem("users", JSON.stringify(state.users));
    },
  },
});

export const {
  setFormField,
  resetForm,
  addUser,
  editUser,
  updateUser,
  deleteUser,
  deleteUsers,
} = formTableSlice.actions;

export default formTableSlice.reducer;
