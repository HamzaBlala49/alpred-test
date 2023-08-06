import * as yup from "yup";

const officeSchema = yup.object().shape({
    name:yup.string().min(3,"يجب أن يكون الأدخال أكثر من 3 حروف").max(200,"يجب أن يكون أقل من 25 حرفاً").required("هذا الحقل مطلوب"),
    phone:yup.string().test("len" ," يجب أن يكون 9 ارقام أو 8 ارقام اذا كان رقم هاتف ادخل مفتاح المحافظة ", val => val.toString().length === 9 || val.toString().length === 8  ).required("هذا الحقل مطلوب"),
})

const storeSchema = yup.object().shape({
    name:yup.string().min(3,"يجب أن يكون الأدخال أكثر من 3 حروف").max(200,"يجب أن يكون أقل من 25 حرفاً").required("هذا الحقل مطلوب"),
    number:yup.number().positive("رقم المخزن يجب ان يكون  أكبر من 0").required("هذا الحقل مطلوب"),
})

const financeSchema = yup.object().shape({
    price:yup.number().positive("السعر يجب أن يكون موجباً").required("هذا الحقل مطلوب"),
    nots:yup.string().min(3,"يجب أن يكون الأدخال أكثر من 3 حروف").max(200,"يجب أن يكون أقل من 200 حرفاً"),
    type_accoun:yup.string(),
    type_currency:yup.string(),
})

// مشكلة
const customerSchema = yup.object().shape({
    name:yup.string().min(3,"يجب أن يكون الأدخال أكثر من 3 حروف").max(200,"يجب أن يكون أقل من 25 حرفاً").required("هذا الحقل مطلوب"),
    // phone_1:yup.string().test("len" ," يجب أن يكون 9 ارقام أو 8 ارقام اذا كان رقم هاتف ادخل مفتاح المحافظة ", val => val.toString().length === 9 || val.toString().length === 8  ).required("هذا الحقل مطلوب"),
    // phone_2:yup.string().test("len" ," يجب أن يكون 9 ارقام أو 8 ارقام اذا كان رقم هاتف ادخل مفتاح المحافظة ", val => val.toString().length === 9 || val.toString().length === 8  ).required("هذا الحقل مطلوب"),
    number_doc:yup.number().required("هذا الحقل مطلوب"),
    price:yup.number().positive("السعر يجب أن يكون موجباً").required("هذا الحقل مطلوب"),


})


const expulsionSchema = yup.object().shape({
    content:yup.string().min(3,"يجب أن يكون الأدخال أكثر من 3 حروف").required("هذا الحقل مطلوب"),
    recipient_phone_1:yup.string().test("len" ," يجب أن يكون 9 ارقام أو 8 ارقام اذا كان رقم هاتف ادخل مفتاح المحافظة ", val => val.toString().length === 9 || val.toString().length === 8  ).required("هذا الحقل مطلوب"),
    recipient_phone_2:yup.string().test("len" ," يجب أن يكون 9 ارقام أو 8 ارقام اذا كان رقم هاتف ادخل مفتاح المحافظة ", val => val.toString().length === 9 || val.toString().length === 8  ).required("هذا الحقل مطلوب"),
    recipient_name:yup.string().min(3,"يجب أن يكون الأدخال أكثر من 3 حروف").max(200,"يجب أن يكون أقل من 25 حرفاً").required("هذا الحقل مطلوب"),
    price:yup.number().positive("السعر يجب أن يكون موجباً").required("هذا الحقل مطلوب"),
})





const loginSchema = yup.object().shape({
    username:yup.string().required("أسم المستخدم مطلوب"),
    password:yup.string().required("كلمة المرور مطلوبة"),
})


export {
    officeSchema,
    storeSchema,
    financeSchema,
    loginSchema,
    customerSchema,
    expulsionSchema
}