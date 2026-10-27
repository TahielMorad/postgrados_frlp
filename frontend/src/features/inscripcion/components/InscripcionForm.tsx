import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";
import { Button } from "../../../shared/components/Button";
import { FeedbackMessage } from "../../../shared/components/FeedbackMessage";
import {
  inscripcionSchema,
  type InscripcionFormData,
} from "../schemas/inscripcionSchema";
import { crearPreinscripcionApi } from "../../../shared/api/legajosApi";

const BORRADOR_KEY = "inscripcion-borrador";
const BORRADORES_POR_EMAIL_KEY = "inscripcion-borradores-por-email";

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

type EstadoBorrador =
  { tipo: "exito"; mensaje: string } | { tipo: "error"; mensaje: string };

function normalizarEmail(email: string): string {
  return email.trim().toLowerCase();
}

function leerBorradorActivo(): Partial<InscripcionFormData> | null {
  const borradorActivo = localStorage.getItem(BORRADOR_KEY);

  if (!borradorActivo) {
    return null;
  }

  try {
    return JSON.parse(borradorActivo) as Partial<InscripcionFormData>;
  } catch {
    localStorage.removeItem(BORRADOR_KEY);
    return null;
  }
}

function leerBorradoresPorEmail(): Record<
  string,
  Partial<InscripcionFormData>
> {
  const borradoresGuardados = localStorage.getItem(BORRADORES_POR_EMAIL_KEY);

  if (!borradoresGuardados) {
    return {};
  }

  try {
    return JSON.parse(borradoresGuardados) as Record<
      string,
      Partial<InscripcionFormData>
    >;
  } catch {
    localStorage.removeItem(BORRADORES_POR_EMAIL_KEY);
    return {};
  }
}

function guardarBorradorLocal(data: InscripcionFormData) {
  const email = normalizarEmail(data.emailPrincipal);
  const borradores = leerBorradoresPorEmail();

  borradores[email] = data;

  localStorage.setItem(BORRADOR_KEY, JSON.stringify(data));
  localStorage.setItem(BORRADORES_POR_EMAIL_KEY, JSON.stringify(borradores));
}

function recuperarBorradorPorEmail(
  emailIngresado: string,
): InscripcionFormData | null {
  const email = normalizarEmail(emailIngresado);
  const borradorGuardado = leerBorradoresPorEmail()[email];
  const borradorActivo = leerBorradorActivo();
  const borradorAnterior =
    borradorActivo &&
    normalizarEmail(borradorActivo.emailPrincipal ?? "") === email
      ? borradorActivo
      : null;
  const borrador = borradorGuardado ?? borradorAnterior;

  if (!borrador) {
    return null;
  }

  return { ...valoresIniciales, ...borrador, emailPrincipal: email };
}

export function InscripcionForm() {
  const navigate = useNavigate();

  const [estadoBorrador, setEstadoBorrador] = useState<EstadoBorrador | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    setFocus,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<InscripcionFormData>({
    resolver: zodResolver(inscripcionSchema),
    defaultValues: valoresIniciales,
    mode: "onBlur",
    reValidateMode: "onChange",
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

  async function guardarBorrador() {
    const emailValido = await trigger("emailPrincipal");

    if (!emailValido) {
      setEstadoBorrador({
        tipo: "error",
        mensaje: "Ingresá un correo principal válido para guardar el borrador.",
      });
      setFocus("emailPrincipal");
      return;
    }

    guardarBorradorLocal(getValues());
    setEstadoBorrador({
      tipo: "exito",
      mensaje: "Borrador guardado en este navegador.",
    });
  }

  async function recuperarBorrador() {
    const emailValido = await trigger("emailPrincipal");

    if (!emailValido) {
      setEstadoBorrador({
        tipo: "error",
        mensaje:
          "Ingresá el correo principal del borrador que querés recuperar.",
      });
      setFocus("emailPrincipal");
      return;
    }

    const borrador = recuperarBorradorPorEmail(getValues("emailPrincipal"));

    if (!borrador) {
      setEstadoBorrador({
        tipo: "error",
        mensaje:
          "No hay un borrador guardado para este correo en el navegador.",
      });
      return;
    }

    reset(borrador);
    setEstadoBorrador({
      tipo: "exito",
      mensaje: "Borrador recuperado correctamente.",
    });
  }

  async function onSubmit(data: InscripcionFormData) {
    guardarBorradorLocal(data);
    try {
      const res = await crearPreinscripcionApi(
        data as unknown as Record<string, unknown>,
      );
      if (res?.id) {
        localStorage.setItem("ultimo_legajo_id", res.id);
      }
    } catch (err) {
      console.error("Error al enviar preinscripción:", err);
    }
    navigate("/inscripcion/documentos");
  }

  function inputClassName(tieneError: boolean): string {
    return `ui-control ${tieneError ? "ui-control-error" : ""}`;
  }

  const errorClassName = "ui-error";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ui-form-card" noValidate>
      <section>
        <h2 className="ui-section-title">Datos personales</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="nombre" className="ui-label">
              Nombre *
            </label>
            <input
              id="nombre"
              type="text"
              autoComplete="given-name"
              {...register("nombre")}
              aria-invalid={Boolean(errors.nombre)}
              className={inputClassName(Boolean(errors.nombre))}
            />
            {errors.nombre && (
              <p className={errorClassName}>{errors.nombre.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="apellido" className="ui-label">
              Apellido *
            </label>
            <input
              id="apellido"
              type="text"
              autoComplete="family-name"
              {...register("apellido")}
              aria-invalid={Boolean(errors.apellido)}
              className={inputClassName(Boolean(errors.apellido))}
            />
            {errors.apellido && (
              <p className={errorClassName}>{errors.apellido.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="nacionalidad" className="ui-label">
              Nacionalidad *
            </label>
            <input
              id="nacionalidad"
              type="text"
              {...register("nacionalidad")}
              aria-invalid={Boolean(errors.nacionalidad)}
              className={inputClassName(Boolean(errors.nacionalidad))}
            />
            {errors.nacionalidad && (
              <p className={errorClassName}>{errors.nacionalidad.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="tipoDocumento" className="ui-label">
              Tipo de documento *
            </label>
            <select
              id="tipoDocumento"
              {...register("tipoDocumento")}
              aria-invalid={Boolean(errors.tipoDocumento)}
              className={inputClassName(Boolean(errors.tipoDocumento))}
            >
              <option value="DNI">DNI</option>
              <option value="PASAPORTE">Pasaporte</option>
            </select>
            {errors.tipoDocumento && (
              <p className={errorClassName}>{errors.tipoDocumento.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="numeroDocumento" className="ui-label">
              Número de documento *
            </label>
            <input
              id="numeroDocumento"
              type="text"
              inputMode="numeric"
              maxLength={8}
              autoComplete="off"
              {...register("numeroDocumento")}
              aria-invalid={Boolean(errors.numeroDocumento)}
              className={inputClassName(Boolean(errors.numeroDocumento))}
            />
            <p className="ui-help">Ingresá 7 u 8 dígitos, sin puntos.</p>
            {errors.numeroDocumento && (
              <p className={errorClassName}>{errors.numeroDocumento.message}</p>
            )}
          </div>
        </div>
      </section>

      <section className="ui-form-section">
        <h2 className="ui-section-title">Contacto</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="telefonoMovil" className="ui-label">
              Teléfono móvil *
            </label>
            <input
              id="telefonoMovil"
              type="tel"
              autoComplete="tel"
              {...register("telefonoMovil")}
              aria-invalid={Boolean(errors.telefonoMovil)}
              className={inputClassName(Boolean(errors.telefonoMovil))}
            />
            {errors.telefonoMovil && (
              <p className={errorClassName}>{errors.telefonoMovil.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="telefonoFijo" className="ui-label">
              Teléfono fijo
            </label>
            <input
              id="telefonoFijo"
              type="tel"
              {...register("telefonoFijo")}
              aria-invalid={Boolean(errors.telefonoFijo)}
              className={inputClassName(Boolean(errors.telefonoFijo))}
            />
            {errors.telefonoFijo && (
              <p className={errorClassName}>{errors.telefonoFijo.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="emailPrincipal" className="ui-label">
              Correo principal *
            </label>
            <input
              id="emailPrincipal"
              type="email"
              autoComplete="email"
              {...register("emailPrincipal")}
              aria-invalid={Boolean(errors.emailPrincipal)}
              className={inputClassName(Boolean(errors.emailPrincipal))}
            />
            {errors.emailPrincipal && (
              <p className={errorClassName}>{errors.emailPrincipal.message}</p>
            )}

            <button
              type="button"
              onClick={recuperarBorrador}
              className="ui-text-link mt-2 text-sm"
            >
              Recuperar borrador de este correo
            </button>
          </div>

          <div>
            <label htmlFor="emailAlternativo" className="ui-label">
              Correo alternativo *
            </label>
            <input
              id="emailAlternativo"
              type="email"
              {...register("emailAlternativo")}
              aria-invalid={Boolean(errors.emailAlternativo)}
              className={inputClassName(Boolean(errors.emailAlternativo))}
            />
            {errors.emailAlternativo && (
              <p className={errorClassName}>
                {errors.emailAlternativo.message}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="ui-form-section">
        <h2 className="ui-section-title">Domicilio</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="direccion" className="ui-label">
              Dirección *
            </label>
            <input
              id="direccion"
              type="text"
              autoComplete="street-address"
              {...register("direccion")}
              aria-invalid={Boolean(errors.direccion)}
              className={inputClassName(Boolean(errors.direccion))}
            />
            {errors.direccion && (
              <p className={errorClassName}>{errors.direccion.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="ciudad" className="ui-label">
              Ciudad *
            </label>
            <input
              id="ciudad"
              type="text"
              autoComplete="address-level2"
              {...register("ciudad")}
              aria-invalid={Boolean(errors.ciudad)}
              className={inputClassName(Boolean(errors.ciudad))}
            />
            {errors.ciudad && (
              <p className={errorClassName}>{errors.ciudad.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="provincia" className="ui-label">
              Provincia *
            </label>
            <input
              id="provincia"
              type="text"
              autoComplete="address-level1"
              {...register("provincia")}
              aria-invalid={Boolean(errors.provincia)}
              className={inputClassName(Boolean(errors.provincia))}
            />
            {errors.provincia && (
              <p className={errorClassName}>{errors.provincia.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="pais" className="ui-label">
              País *
            </label>
            <input
              id="pais"
              type="text"
              autoComplete="country-name"
              {...register("pais")}
              aria-invalid={Boolean(errors.pais)}
              className={inputClassName(Boolean(errors.pais))}
            />
            {errors.pais && (
              <p className={errorClassName}>{errors.pais.message}</p>
            )}
          </div>
        </div>
      </section>

      <section className="ui-form-section">
        <h2 className="ui-section-title">Formación académica</h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="tituloGrado" className="ui-label">
              Título de grado *
            </label>
            <input
              id="tituloGrado"
              type="text"
              {...register("tituloGrado")}
              aria-invalid={Boolean(errors.tituloGrado)}
              className={inputClassName(Boolean(errors.tituloGrado))}
            />
            {errors.tituloGrado && (
              <p className={errorClassName}>{errors.tituloGrado.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="tituloPosgrado" className="ui-label">
              Título de posgrado
            </label>
            <input
              id="tituloPosgrado"
              type="text"
              {...register("tituloPosgrado")}
              className={inputClassName(false)}
            />
          </div>
        </div>
      </section>

      <section className="ui-form-section">
        <fieldset
          aria-invalid={Boolean(errors.carreras)}
          className={
            errors.carreras
              ? "rounded-lg border border-red-400 bg-red-50/40 p-4 sm:p-5"
              : "rounded-lg border border-neutral-200 bg-neutral-50/60 p-4 sm:p-5"
          }
        >
          <legend className="ui-section-title">Carrera elegida *</legend>

          <p className="ui-help">Podés seleccionar hasta dos carreras.</p>

          <div className="mt-4 space-y-3">
            {carrerasDisponibles.map((carrera) => {
              const seleccionada = carrerasSeleccionadas.includes(carrera);
              const deshabilitada =
                !seleccionada && carrerasSeleccionadas.length >= 2;

              return (
                <label
                  key={carrera}
                  className={
                    errors.carreras
                      ? "flex cursor-pointer items-start gap-3 rounded-md border border-red-300 bg-white p-3 transition-colors focus-within:ring-3 focus-within:ring-red-200"
                      : seleccionada
                        ? "flex cursor-pointer items-start gap-3 rounded-md border border-utn-400 bg-utn-50 p-3 transition-colors focus-within:ring-3 focus-within:ring-utn-200"
                        : "flex cursor-pointer items-start gap-3 rounded-md border border-neutral-200 bg-white p-3 transition-colors hover:border-utn-300 hover:bg-utn-50/60 focus-within:ring-3 focus-within:ring-utn-200"
                  }
                >
                  <input
                    type="checkbox"
                    checked={seleccionada}
                    disabled={deshabilitada}
                    onChange={() => alternarCarrera(carrera)}
                    className="ui-checkbox mt-0.5"
                  />
                  <span className="text-sm leading-5 text-neutral-800">
                    {carrera}
                  </span>
                </label>
              );
            })}
          </div>

          {errors.carreras && (
            <p className={errorClassName}>{errors.carreras.message}</p>
          )}
        </fieldset>
      </section>

      <section className="ui-form-section">
        <h2 className="ui-section-title">Información adicional</h2>

        <div className="mt-5 space-y-5">
          <div>
            <label htmlFor="medioConocimiento" className="ui-label">
              ¿Cómo conociste la oferta? *
            </label>
            <select
              id="medioConocimiento"
              {...register("medioConocimiento")}
              aria-invalid={Boolean(errors.medioConocimiento)}
              className={inputClassName(Boolean(errors.medioConocimiento))}
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
            <label htmlFor="motivacion" className="ui-label">
              Motivación *
            </label>
            <textarea
              id="motivacion"
              rows={5}
              {...register("motivacion")}
              aria-invalid={Boolean(errors.motivacion)}
              className={inputClassName(Boolean(errors.motivacion))}
              placeholder="Contanos por qué querés realizar este posgrado."
            />
            <div className="mt-1.5 flex justify-between gap-4 text-sm">
              <span className="text-neutral-600">Mínimo 50 caracteres</span>
              <span
                className={
                  motivacion.length >= 50
                    ? "font-medium text-emerald-800"
                    : "text-neutral-600"
                }
              >
                {motivacion.length} caracteres
              </span>
            </div>
            {errors.motivacion && (
              <p className={errorClassName}>{errors.motivacion.message}</p>
            )}
          </div>

          <div className="rounded-lg border border-neutral-200 bg-neutral-50/60 p-4 sm:p-5">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                {...register("solicitaBeca")}
                className="ui-checkbox"
              />
              <span className="font-semibold text-neutral-800">
                Solicito una beca
              </span>
            </label>

            {solicitaBeca && (
              <div className="mt-4 space-y-5">
                <div>
                  <label htmlFor="porcentajeBeca" className="ui-label">
                    Porcentaje solicitado *
                  </label>
                  <select
                    id="porcentajeBeca"
                    {...register("porcentajeBeca")}
                    aria-invalid={Boolean(errors.porcentajeBeca)}
                    className={inputClassName(Boolean(errors.porcentajeBeca))}
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
                </div>

                <section
                  aria-labelledby="formulario-beca-title"
                  className="rounded-lg border border-utn-200 bg-white p-4 shadow-xs sm:p-5"
                >
                  <h3
                    id="formulario-beca-title"
                    className="font-display text-lg font-bold text-neutral-950"
                  >
                    Formulario de solicitud de beca
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    Descargá el formulario, completalo y luego adjuntalo durante
                    la carga de documentación.
                  </p>

                  <a
                    href="/formularios/formulario-solicitud-beca.pdf"
                    download
                    className="ui-button ui-button-secondary ui-button-md mt-4 w-full sm:w-auto"
                  >
                    Descargar formulario de beca
                  </a>
                </section>
              </div>
            )}
          </div>
        </div>
      </section>

      {estadoBorrador && (
        <FeedbackMessage
          role={estadoBorrador.tipo === "error" ? "alert" : "status"}
          tone={estadoBorrador.tipo === "error" ? "error" : "success"}
        >
          {estadoBorrador.mensaje}
        </FeedbackMessage>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 pt-6 sm:flex-row sm:justify-end">
        <Button type="button" onClick={guardarBorrador} variant="secondary">
          Guardar borrador
        </Button>

        <Button type="submit" loading={isSubmitting}>
          Continuar a documentación
        </Button>
      </div>
    </form>
  );
}
