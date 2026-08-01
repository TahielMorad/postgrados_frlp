import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  inscripcionSchema,
  type InscripcionFormData,
} from "../schemas/inscripcionSchema";

const BORRADOR_KEY = "inscripcion-borrador";

const carrerasDisponibles = [
  "Doctorado en Ingeniería",
  "Maestría en Ingeniería de Sistemas",
  "Maestría en Administración de Negocios",
  "Especialización en Ingeniería Gerencial",
  "Especialización en Higiene y Seguridad en el Trabajo",
];

const mediosConocimiento = [
  "Sitio web de la UTN",
  "Redes sociales",
  "Correo electrónico",
  "Recomendación de un docente",
  "Recomendación de un estudiante o graduado",
  "Evento o charla informativa",
  "Otro",
];

const valoresIniciales: InscripcionFormData = {
  nombre: "",
  apellido: "",
  nacionalidad: "",
  tipoDocumento: "DNI",
  numeroDocumento: "",
  telefonoMovil: "",
  telefonoFijo: "",
  emailPrincipal: "",
  emailAlternativo: "",
  direccion: "",
  ciudad: "",
  provincia: "",
  pais: "Argentina",
  tituloGrado: "",
  tituloPosgrado: "",
  carreras: [],
  medioConocimiento: "",
  motivacion: "",
  solicitaBeca: false,
  porcentajeBeca: "",
};

function recuperarBorrador(): InscripcionFormData {
  const borrador = localStorage.getItem(BORRADOR_KEY);

  if (!borrador) {
    return valoresIniciales;
  }

  try {
    return {
      ...valoresIniciales,
      ...(JSON.parse(borrador) as Partial<InscripcionFormData>),
    };
  } catch {
    localStorage.removeItem(BORRADOR_KEY);
    return valoresIniciales;
  }
}

export function InscripcionForm() {
  const [borradorGuardado, setBorradorGuardado] = useState(false);

  const valoresPorDefecto = useMemo(() => recuperarBorrador(), []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<InscripcionFormData>({
    resolver: zodResolver(inscripcionSchema),
    defaultValues: valoresPorDefecto,
  });

  const carrerasSeleccionadas =
    useWatch({
      control,
      name: "carreras",
    }) ?? [];

  const solicitaBeca =
    useWatch({
      control,
      name: "solicitaBeca",
    }) ?? false;

  const motivacion =
    useWatch({
      control,
      name: "motivacion",
    }) ?? "";

  useEffect(() => {
    if (!solicitaBeca) {
      setValue("porcentajeBeca", "");
    }
  }, [solicitaBeca, setValue]);

  function alternarCarrera(carrera: string) {
    const seleccionActual = getValues("carreras");

    if (seleccionActual.includes(carrera)) {
      setValue(
        "carreras",
        seleccionActual.filter((item) => item !== carrera),
        { shouldValidate: true },
      );
      return;
    }

    if (seleccionActual.length >= 2) {
      return;
    }

    setValue("carreras", [...seleccionActual, carrera], {
      shouldValidate: true,
    });
  }

  function guardarBorrador() {
    localStorage.setItem(BORRADOR_KEY, JSON.stringify(getValues()));
    setBorradorGuardado(true);

    window.setTimeout(() => {
      setBorradorGuardado(false);
    }, 2500);
  }

  function onSubmit(data: InscripcionFormData) {
    localStorage.setItem(BORRADOR_KEY, JSON.stringify(data));

    console.info("Datos de inscripción validados:", data);

    alert(
      "Los datos fueron validados. El siguiente paso será cargar la documentación.",
    );
  }

  const inputClassName =
    "mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  const errorClassName = "mt-1 text-sm text-red-700";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      noValidate
    >
      <section>
        <h2 className="text-xl font-semibold text-slate-900">
          Datos personales
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-slate-700"
            >
              Nombre *
            </label>
            <input
              id="nombre"
              type="text"
              autoComplete="given-name"
              {...register("nombre")}
              className={inputClassName}
            />
            {errors.nombre && (
              <p className={errorClassName}>{errors.nombre.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="apellido"
              className="block text-sm font-medium text-slate-700"
            >
              Apellido *
            </label>
            <input
              id="apellido"
              type="text"
              autoComplete="family-name"
              {...register("apellido")}
              className={inputClassName}
            />
            {errors.apellido && (
              <p className={errorClassName}>{errors.apellido.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="nacionalidad"
              className="block text-sm font-medium text-slate-700"
            >
              Nacionalidad *
            </label>
            <input
              id="nacionalidad"
              type="text"
              {...register("nacionalidad")}
              className={inputClassName}
            />
            {errors.nacionalidad && (
              <p className={errorClassName}>{errors.nacionalidad.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="tipoDocumento"
              className="block text-sm font-medium text-slate-700"
            >
              Tipo de documento *
            </label>
            <select
              id="tipoDocumento"
              {...register("tipoDocumento")}
              className={inputClassName}
            >
              <option value="DNI">DNI</option>
              <option value="PASAPORTE">Pasaporte</option>
            </select>
            {errors.tipoDocumento && (
              <p className={errorClassName}>{errors.tipoDocumento.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="numeroDocumento"
              className="block text-sm font-medium text-slate-700"
            >
              Número de documento *
            </label>
            <input
              id="numeroDocumento"
              type="text"
              autoComplete="off"
              {...register("numeroDocumento")}
              className={inputClassName}
            />
            {errors.numeroDocumento && (
              <p className={errorClassName}>{errors.numeroDocumento.message}</p>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 pt-8">
        <h2 className="text-xl font-semibold text-slate-900">Contacto</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="telefonoMovil"
              className="block text-sm font-medium text-slate-700"
            >
              Teléfono móvil *
            </label>
            <input
              id="telefonoMovil"
              type="tel"
              autoComplete="tel"
              {...register("telefonoMovil")}
              className={inputClassName}
            />
            {errors.telefonoMovil && (
              <p className={errorClassName}>{errors.telefonoMovil.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="telefonoFijo"
              className="block text-sm font-medium text-slate-700"
            >
              Teléfono fijo
            </label>
            <input
              id="telefonoFijo"
              type="tel"
              {...register("telefonoFijo")}
              className={inputClassName}
            />
            {errors.telefonoFijo && (
              <p className={errorClassName}>{errors.telefonoFijo.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="emailPrincipal"
              className="block text-sm font-medium text-slate-700"
            >
              Correo principal *
            </label>
            <input
              id="emailPrincipal"
              type="email"
              autoComplete="email"
              {...register("emailPrincipal")}
              className={inputClassName}
            />
            {errors.emailPrincipal && (
              <p className={errorClassName}>{errors.emailPrincipal.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="emailAlternativo"
              className="block text-sm font-medium text-slate-700"
            >
              Correo alternativo *
            </label>
            <input
              id="emailAlternativo"
              type="email"
              {...register("emailAlternativo")}
              className={inputClassName}
            />
            {errors.emailAlternativo && (
              <p className={errorClassName}>
                {errors.emailAlternativo.message}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 pt-8">
        <h2 className="text-xl font-semibold text-slate-900">Domicilio</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label
              htmlFor="direccion"
              className="block text-sm font-medium text-slate-700"
            >
              Dirección *
            </label>
            <input
              id="direccion"
              type="text"
              autoComplete="street-address"
              {...register("direccion")}
              className={inputClassName}
            />
            {errors.direccion && (
              <p className={errorClassName}>{errors.direccion.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="ciudad"
              className="block text-sm font-medium text-slate-700"
            >
              Ciudad *
            </label>
            <input
              id="ciudad"
              type="text"
              autoComplete="address-level2"
              {...register("ciudad")}
              className={inputClassName}
            />
            {errors.ciudad && (
              <p className={errorClassName}>{errors.ciudad.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="provincia"
              className="block text-sm font-medium text-slate-700"
            >
              Provincia *
            </label>
            <input
              id="provincia"
              type="text"
              autoComplete="address-level1"
              {...register("provincia")}
              className={inputClassName}
            />
            {errors.provincia && (
              <p className={errorClassName}>{errors.provincia.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="pais"
              className="block text-sm font-medium text-slate-700"
            >
              País *
            </label>
            <input
              id="pais"
              type="text"
              autoComplete="country-name"
              {...register("pais")}
              className={inputClassName}
            />
            {errors.pais && (
              <p className={errorClassName}>{errors.pais.message}</p>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 pt-8">
        <h2 className="text-xl font-semibold text-slate-900">
          Formación académica
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="tituloGrado"
              className="block text-sm font-medium text-slate-700"
            >
              Título de grado *
            </label>
            <input
              id="tituloGrado"
              type="text"
              {...register("tituloGrado")}
              className={inputClassName}
            />
            {errors.tituloGrado && (
              <p className={errorClassName}>{errors.tituloGrado.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="tituloPosgrado"
              className="block text-sm font-medium text-slate-700"
            >
              Título de posgrado
            </label>
            <input
              id="tituloPosgrado"
              type="text"
              {...register("tituloPosgrado")}
              className={inputClassName}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 pt-8">
        <fieldset>
          <legend className="text-xl font-semibold text-slate-900">
            Carrera elegida *
          </legend>

          <p className="mt-1 text-sm text-slate-600">
            Podés seleccionar hasta dos carreras.
          </p>

          <div className="mt-4 space-y-3">
            {carrerasDisponibles.map((carrera) => {
              const seleccionada = carrerasSeleccionadas.includes(carrera);
              const deshabilitada =
                !seleccionada && carrerasSeleccionadas.length >= 2;

              return (
                <label
                  key={carrera}
                  className="flex items-start gap-3 rounded-md border border-slate-200 p-3"
                >
                  <input
                    type="checkbox"
                    checked={seleccionada}
                    disabled={deshabilitada}
                    onChange={() => alternarCarrera(carrera)}
                    className="mt-1 h-4 w-4"
                  />
                  <span className="text-sm text-slate-800">{carrera}</span>
                </label>
              );
            })}
          </div>

          {errors.carreras && (
            <p className={errorClassName}>{errors.carreras.message}</p>
          )}
        </fieldset>
      </section>

      <section className="border-t border-slate-200 pt-8">
        <h2 className="text-xl font-semibold text-slate-900">
          Información adicional
        </h2>

        <div className="mt-5 space-y-5">
          <div>
            <label
              htmlFor="medioConocimiento"
              className="block text-sm font-medium text-slate-700"
            >
              ¿Cómo conociste la oferta? *
            </label>
            <select
              id="medioConocimiento"
              {...register("medioConocimiento")}
              className={inputClassName}
            >
              <option value="">Seleccioná una opción</option>
              {mediosConocimiento.map((medio) => (
                <option key={medio} value={medio}>
                  {medio}
                </option>
              ))}
            </select>
            {errors.medioConocimiento && (
              <p className={errorClassName}>
                {errors.medioConocimiento.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="motivacion"
              className="block text-sm font-medium text-slate-700"
            >
              Motivación *
            </label>
            <textarea
              id="motivacion"
              rows={5}
              {...register("motivacion")}
              className={inputClassName}
              placeholder="Contanos por qué querés realizar este posgrado."
            />
            <div className="mt-1 flex justify-between gap-4 text-sm">
              <span className="text-slate-500">Mínimo 50 caracteres</span>
              <span
                className={
                  motivacion.length >= 50 ? "text-green-700" : "text-slate-500"
                }
              >
                {motivacion.length} caracteres
              </span>
            </div>
            {errors.motivacion && (
              <p className={errorClassName}>{errors.motivacion.message}</p>
            )}
          </div>

          <div className="rounded-md border border-slate-200 p-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                {...register("solicitaBeca")}
                className="h-4 w-4"
              />
              <span className="font-medium text-slate-800">
                Solicito una beca
              </span>
            </label>

            {solicitaBeca && (
              <div className="mt-4">
                <label
                  htmlFor="porcentajeBeca"
                  className="block text-sm font-medium text-slate-700"
                >
                  Porcentaje solicitado *
                </label>
                <select
                  id="porcentajeBeca"
                  {...register("porcentajeBeca")}
                  className={inputClassName}
                >
                  <option value="">Seleccioná una opción</option>
                  <option value="30">30 %</option>
                  <option value="100">100 %</option>
                </select>
                {errors.porcentajeBeca && (
                  <p className={errorClassName}>
                    {errors.porcentajeBeca.message}
                  </p>
                )}

                <p className="mt-2 text-sm text-slate-600">
                  El formulario de beca se adjuntará en la etapa de
                  documentación.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {borradorGuardado && (
        <p
          role="status"
          className="rounded-md bg-green-50 p-3 text-sm text-green-800"
        >
          Borrador guardado en este navegador.
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={guardarBorrador}
          className="rounded-md border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
        >
          Guardar borrador
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-700 px-5 py-2.5 font-medium text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Continuar a documentación
        </button>
      </div>
    </form>
  );
}
