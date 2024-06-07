"use client";

import { createParticipant } from "@/actions/participant/create-participant";
import {
  ParticipantParamsSchema,
  ParticipantParamsType,
} from "@/lib/validations/participant";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Button from "./Button";
import Input from "./Input";

export default function Header({
  fetchParticipants,
}: {
  fetchParticipants: (load: boolean) => void;
}) {
  const formik = useFormik<ParticipantParamsType>({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    validateOnBlur: true,
    validationSchema: ParticipantParamsSchema,
    onSubmit: async (values, formikHelpers) => {
      if (!values.participation) return;

      const created = await createParticipant({
        name: `${values.firstName} ${values.lastName}`,
        participation: values.participation,
      });

      if (created.code === 201) {
        formikHelpers.resetForm();
        fetchParticipants(false);
        toast.success(`${created.message}`);
      } else {
        toast.error(`${created.message}`);
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = formik;

  return (
    <div className="p-10 bg-primary" role="heading" aria-level={1}>
      <form onSubmit={handleSubmit} className="flex justify-center gap-5">
        <Input
          placeholder="First name"
          id="firstName"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.firstName}
          touched={touched.firstName}
        />
        <Input
          placeholder="Last name"
          id="lastName"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.lastName}
          touched={touched.lastName}
        />
        <Input
          type="number"
          placeholder="Participation"
          id="participation"
          value={values.participation}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.participation}
          touched={touched.participation}
        />
        <Button type="submit">{isSubmitting ? "Loading..." : "Send"}</Button>
      </form>
    </div>
  );
}
