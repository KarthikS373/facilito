import { getCollection } from "utils/db";

// USER
export const getUser = async (email: string) => {
  if (email) {
    // DOC
    const userCol = await getCollection("users");
    const userDoc = userCol.doc(email);

    // USUARIO
    const user = (await userDoc.get()).data() as User;
    return user;
  } else return null;
};

// ACTUALIZAR USUARIO
export const addCompanyToUser = async (
  role: "admin" | "user",
  email?: string,
  companyID?: string
) => {
  if (companyID && email) {
    // DOC
    const userCol = await getCollection("users");
    const userDoc = userCol.doc(email);

    // USUARIO
    return userDoc.set(
      {
        business: companyID,
        role
      },
      { merge: true }
    );
  } else return null;
};

export const changeUserRole = async (email: string, role: string) => {
  // BUSCAR
  const collection = await getCollection("users");
  const doc = collection.doc(email);

  // ASIGNAR
  doc.set({ role }, { merge: true });
};
