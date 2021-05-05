import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";

import Swal from "sweetalert2";
import {useDispatch, useSelector} from "react-redux";
import {uiCloseModal} from "../../actions/ui";
import {
    eventClearActive,
    eventStartAddNew,
    eventUpdate
} from "../../actions/events";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
    }
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

//Lo inicializa en la hora actual más 1 hora
const dateNow = moment().minutes(0).seconds(0).add(1, "hours");
const dateFuture = dateNow.clone().add(1, "hours");

//Declarando las constantes fuera de la función principal,
//hará que solamente se instancie 1 vez y no cada vez que se reconstruye la clase
const initEvent = {
    title: "",
    notes: "",
    start: dateNow.toDate(),
    end: dateFuture.toDate()
};

export const CalendarModal = () => {
    const dispatch = useDispatch();

    //Hook de Redux que retorna el state actual
    //En este caso tomo el atributo ui del state y luego desestructuro el modalOpen
    const {modalOpen} = useSelector((state) => {
        return state.ui;
    });
    const {activeEvent} = useSelector((state) => {
        return state.calendar;
    });

    //Mantiene el estado de la fecha seleccionada en el campo del datepicker
    const [dateStart, setDateStart] = useState(dateNow.toDate());
    const [dateEnd, setDateEnd] = useState(dateFuture.toDate());
    const [validTitle, setValidTitle] = useState(true);

    //Mantiene el estado del formulario para agregar un nuevo evento
    const [formValues, setFormValues] = useState(initEvent);

    const {title, notes, start, end} = formValues;

    //Queda escuchando cuando cambia el activeEvent
    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
        } else {
            setFormValues(initEvent);
        }
    }, [activeEvent, setFormValues]);

    const handleInputChange = ({target}) => {
        setFormValues({
            //primero establezco todos los valores del formulario
            ...formValues,
            //para el campo que estoy cambiando, toma su nombre y asigna el value
            [target.name]: target.value
        });
    };

    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(eventClearActive());
        setFormValues(initEvent);
    };

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        });
    };

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //Creo instancias de moment
        const momentStart = moment(start);
        const momentEnd = moment(end);
        if (momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire("Error", "La fecha de fin debe ser mayor a la de inicio");
            return;
        }

        if (title.trim().length < 10) {
            return setValidTitle(false);
        }

        if (activeEvent) {
            dispatch(eventUpdate(formValues));
        } else {
            //A la acción le paso el evento y le agrego un id y el usuario
            dispatch(eventStartAddNew(formValues));
            //TODO: grabar en base de datos
        }

        setValidTitle(true);
        closeModal();
    };

    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> {activeEvent ? "Modificar evento" : "Nuevo evento"} </h1>
            <hr />
            <form className="container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={start}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={end}
                        className="form-control"
                        minDate={dateStart}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${
                            !validTitle && "is-invalid"
                        }`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                        required="required"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        Una descripción corta
                    </small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">
                        Información adicional
                    </small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    );
};
