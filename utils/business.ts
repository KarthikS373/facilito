// DB
import { getCollection } from "./db";
import { getCallable } from "./functions";
import { getRealtimeRef } from "./realtime";

// DOCUMENTO DE EMPRES
const getBusinessDoc = async (url: string) => {
  // COLECCIÓN DE EMPRESA
  const businessCol = await getCollection("business");
  const businessDoc = businessCol.doc(url);
  return businessDoc;
};

// OBTENER TODAS LAS EMPRESAS
export const getBusiness = async () => {
  // COLECCIÓN DE EMPRESA
  const businessCol = await getCollection("business");
  const businessReq = await businessCol.get();
  const businessDocs = businessReq.docs.map(doc => doc.data()) as
    | Business[]
    | undefined;
  return businessDocs;
};

// BUSCAR ID POR URL
export const findCompanyIdByURL = async (url: string) => {
  // LEER
  const businessCol = await getCollection("business");
  const businessDoc = businessCol.where("url", "==", url).limit(1);
  const business: Business[] | undefined = (
    await businessDoc.get()
  ).docs.map(doc => doc.data()) as [Business];

  // RETORNAR EMPRESA
  return business[0];
};

// OBTENER EMPRESA
export const getCompany = async (url: string) => {
  if (url) {
    // COLECCIÓN DE EMPRESA
    const businessDoc = await getBusinessDoc(url);
    const businessData = (await businessDoc.get()).data() as Business;
    return businessData;
  } else return null;
};

// AGREGAR USUARIO
export const addUserToCompany = async (
  companyID: string,
  userEmail: string
) => {
  // COLECCIÓN DE EMPRESA
  const businessDoc = await getBusinessDoc(companyID);
  const businessData = (await businessDoc.get()).data() as Business | undefined;
  const users = businessData?.users || [];

  // AGREGAR
  users.push(userEmail);

  if (businessData) {
    businessData.users = users;
    // ACTUALIZAR

    return businessDoc.set(businessData);
  }
};

// ACTUALIZAR EMPRESA
export const updateBusiness = async (
  data: Business | null,
  merge: boolean = false
) => {
  // COLECCIÓN DE EMPRESA
  if (data) {
    const businessCol = await getCollection("business");
    const businessDoc = businessCol.doc(data.id);

    // ACTUALIZAR
    return businessDoc.set(data, { merge });
  }
};

// AGREGAR LA URL A LA LISTA DE FORMULARIOS
export const addBusinessFormURL = async (id: string, companyID: string) => {
  // COLECCIÓN DE EMPRESA
  const businessDoc = await getBusinessDoc(companyID);
  const businessData = (await businessDoc.get()).data() as Business | undefined;
  const forms = businessData?.forms || [];

  // AGREGAR
  forms.push(id);

  // ACTUALIZAR
  if (businessData) {
    businessData.forms = forms;
    return businessDoc.set(businessData);
  }
};

// AGREGAR LA URL A LA LISTA DE CATEGORÍAS
export const addBusinessCategory = async (url: string, companyID: string) => {
  // COLECCIÓN DE EMPRESA
  const businessDoc = await getBusinessDoc(companyID);
  const businessData = (await businessDoc.get()).data() as Business | undefined;
  const categories = businessData?.categories || [];

  // AGREGAR
  categories.push(url);

  if (businessData) {
    businessData.categories = categories;

    // ACTUALIZAR
    return businessDoc.set(businessData);
  }
};

// BORRAR UNA CATEGORÍA
export const deleteBusinessCategory = async (
  companyID: string,
  category: string
) => {
  // COLECCIÓN DE EMPRESA
  const businessDoc = await getBusinessDoc(companyID);

  // LISTA
  const businessData = (await businessDoc.get()).data() as Business | undefined;
  const categories = businessData?.categories || [];

  // REMOVER
  const categoriesFiltered = categories.filter(
    (categoryId: string) => categoryId !== category
  );

  if (businessData) {
    businessData.categories = categoriesFiltered;

    // ACTUALIZAR
    return businessDoc.set(businessData);
  }
};

// AGREGAR LA URL A LA LISTA DE CATEGORÍAS
export const addBusinessProducts = async (url: string, companyID: string) => {
  // COLECCIÓN DE EMPRESA
  const businessDoc = await getBusinessDoc(companyID);
  const businessData = (await businessDoc.get()).data() as Business | undefined;
  const products = businessData?.products || [];

  // AGREGAR
  products.push(url);

  if (businessData) {
    businessData.products = products;

    // ACTUALIZAR
    return businessDoc.set(businessData);
  }
};

// REMOVER LA URL A LA LISTA DE PRODUCTOS
export const removeProductBusiness = async (id: string, companyID?: string) => {
  if (companyID) {
    // COLECCIÓN DE EMPRESA
    const businessDoc = await getBusinessDoc(companyID);

    // LISTA
    const businessData = (await businessDoc.get()).data() as
      | Business
      | undefined;
    const products = businessData?.products || [];

    // REMOVER
    const productsFiltered = products.filter(
      (productID: string) => productID !== id
    );

    if (businessData) {
      businessData.products = productsFiltered;
      // ACTUALIZAR
      return businessDoc.set(businessData);
    }
  }
};

// REMOVER LA URL A LA LISTA DE FORMULARIOS
export const removeBusinessForm = async (id: string, companyID: string) => {
  // COLECCIÓN DE EMPRESA
  const businessDoc = await getBusinessDoc(companyID);

  // LISTA
  const businessData = (await businessDoc.get()).data() as Business | undefined;
  const forms = businessData?.forms || [];

  // REMOVER
  const formsFiltered = forms.filter((formId: string) => formId !== id);
  if (businessData) {
    businessData.forms = formsFiltered;

    // ACTUALIZAR
    return businessDoc.set(businessData);
  }
};

// ENVIAR SOLICITUD DE ADMISIÓN
export const sendAdmissionRequest = async (
  userName: string,
  business: Business
) => {
  const userAdmission = await getCallable("userAdmission");
  return userAdmission({
    userName,
    business: { ...business, badge: "GTQ" }
  });
};

// VALIDAD URL DE EMPRESA
export const validateCompanyURL = async (url: string) => {
  const collection = await getCollection("business");
  const doc = collection.doc(url);
  const existsDoc: Boolean = (await doc.get()).exists;
  return !existsDoc;
};

// ENVIAR SOLICITUD DE ADMISIÓN (EMPRESA)
export const sendAdmissionRequestCompany = async (
  userName: string,
  business: Business
) => {
  const companyAdmission = await getCallable("companyAdmission");
  return companyAdmission({
    userName,
    business: { ...business, badge: "GTQ" }
  });
};

// BUSCAR ADMISIÓN
export const getAdmission = async (
  id: string,
  setAdmission: (admission?: Admission) => unknown
) => {
  // LEER
  const admissionRef = await getRealtimeRef("admissions");
  const admissionDoc = admissionRef.child(id);

  // ENVIAR
  admissionDoc.once("value", snap => {
    setAdmission(snap.val());
  });
};

// BORRAR ADMISSION
export const deleteAdmission = async (id: string) => {
  // LEER
  const admissionRef = await getRealtimeRef("admissions");
  const admissionDoc = admissionRef.child(id);

  // ENVIAR
  return admissionDoc.remove();
};

// EDITAR CATEGORÍAS
export const updateBusinessCategories = async (
  name: string,
  newName: string,
  companyID: string
) => {
  // COLECCIÓN DE EMPRESA
  const businessDoc = await getBusinessDoc(companyID);

  // LISTA
  const businessData = (await businessDoc.get()).data() as Business | undefined;
  const categories = businessData?.categories || [];

  // REMOVER
  const categoriesReplaced: string[] = categories.map((catId: string) => {
    if (catId === name) return newName;
    else return catId;
  });

  if (businessData) {
    businessData.categories = categoriesReplaced;

    // ACTUALIZAR
    return businessDoc.set(businessData);
  }
};
