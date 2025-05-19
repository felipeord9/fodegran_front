import { Document, Page, View, Text, StyleSheet , Image } from "@react-pdf/renderer";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import Logo from '../../assets/fodegran.jpeg' 
import Aprobado from '../../assets/aprobado.png'
import { useEffect, useState } from "react";
import Rechazado from '../../assets/rechazado.png'
import Desembolso from '../../assets/Desembolso.png'
import { PDFDocument } from 'pdf-lib';
import { config } from '../../config';
import { format } from 'date-fns';
import "./styles.css";

const styles = StyleSheet.create({
  headerText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  clientText: {
    fontSize: 11,
    textAlign: "left",
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "100%",
    fontSize: 8,
    marginTop: 6,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    fontWeight: 500,
    overflow: "hidden",
    border: "1px solid black",
    padding: "8px 5px",
  },
  columnWidth0: {
    width: "10%",
  },
  columnWidth1: {
    width: "25%",
  },
  columnWidth2: {
    width: "50%",
  },
  columnWidth3: {
    width: "75%",
  },
  columnWidth4: {
    width: "100%",
  },
  page: {
    padding: 20,
    fontSize: 9.5,
    fontFamily: "Helvetica",
    border: '1 solid black'
  },
  borderPage:{
    border: '1 solid black'
  },
  logo: {
    width: 180,
    height: 65,
    marginBottom: 2,
    alignSelf: "center",
    marginLeft: 10
  },
  firma: {
    width: 170,
    height: 65,
    marginBottom: 5,
    alignSelf: "center",
    marginLeft: 10
  },
  firmaAsociado:{
    width: 190,
    height: 70,
    marginBottom: 5,
    alignSelf: "center",
    marginLeft: 10
  },
  header: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 12,
    fontWeight: "bold",
  },
  fechaHeader:{
    textAlign: "start",
    marginTop: 60,
    fontSize: 10,
    fontWeight: "bold",
    display:'flex'
  },
  inputFecha:{
    borderBottom: "1 solid black",
    width: "auto",
    height: 12,
    marginBottom: 3,
    marginTop: 40,
  },
  subheaderTop:{
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
    backgroundColor:'#CDCDCD',
    borderTop: "1 solid black",
    padding:4
  },
  subheader:{
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
    backgroundColor:'#CDCDCD',
    padding:4
  },
  section: {
    borderTop:'1 solid black',
    borderBottom:'1 solid black',
  },
  row: {
    flexDirection: "row",
  },
  column: {
    width: "60%",
    flexDirection:'row',
    borderRight: "1 solid black",
  },
  column2:{
    width: "40%",
  },
  column3:{
    width: "50%",
    display:'flex',
    flexDirection:'row',
    border: "1 solid black",
    padding: 8,
    paddingLeft: 3
  },
  columnheader:{
    width: "50%",
    display:'flex',
    flexDirection:'row',
    padding: 8,
    paddingLeft: 3
  },
  columnFirmas:{
    width: "33.5%",
    display:'flex',
    flexDirection:'column',
    border: "1 solid black",
    padding: 8,
    paddingLeft: 3
  },
  column5:{
    width: "50%",
    display:'flex',
    flexDirection:'row',
    border: "1 solid black",
    padding: 8,
    paddingLeft: 3
  },
  column33:{
    width: "33.5%",
    display:'flex',
    flexDirection:'row',
    border: "1 solid black",
    padding: 8,
    paddingLeft: 3
  },
  column20:{
    width: "20%",
    display:'flex',
    flexDirection:'row',
    border: "1 solid black",
    padding: 8,
    paddingLeft: 3
  },
  column40:{
    width: "40%",
    display:'flex',
    flexDirection:'row',
    border: "1 solid black",
    padding: 8,
    paddingLeft: 3
  },
  column60:{
    width: "60%",
    display:'flex',
    flexDirection:'row',
    border: "1 solid black",
    padding: 8,
    paddingLeft: 3
  },
  column100:{
    width: "100%",
    display:'flex',
    flexDirection:'column',
    border: "1 solid black",
    padding: 8,
    paddingLeft: 3
  },
  label: {
    fontWeight: "bold",
  },
  labelFirma:{
    fontWeight: "bold",
    alignSelf: "center",
  },
  input: {
    width: "auto",
    height: 12,
    paddingLeft: 2
  },
  inputFecha:{
    borderBottom: "1 solid black",
    width: "auto",
    height: 12,
    marginBottom: 3,
    marginTop: 60,
    marginLeft: 5
  },
  textData: {
    borderBottom: "1 solid black",
    width: "100%",
    minHeight: 12,
    marginBottom: 10,
    padding: 2,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  checkbox: {
    width: 12,
    height: 12,
    border: "1 solid black",
    marginRight: 5,
    marginLeft:10,
  },
  checkedBox: {
    width: 12,
    height: 12,
    backgroundColor: "black",
    marginRight: 5,
    marginLeft:10,
  },
  checkboxSexo: {
    width: 10,
    height: 10,
    border: "1 solid black",
    marginRight: 6,
    marginLeft: 30,
  },
  checkboxCB: {
    width: 10,
    height: 10,
    border: "1 solid black",
    marginRight: 5,
    marginLeft: 15,
  },
});

const CarpetaArchivoLink = ({ carpeta, archivo }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900); // Establecer a true si la ventana es menor o igual a 768px
    };

    // Llama a handleResize al cargar y al cambiar el tamaño de la ventana
    window.addEventListener('resize', handleResize);
    handleResize(); // Llama a handleResize inicialmente para establecer el estado correcto

    // Elimina el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const url = `${config.apiUrl2}/upload/obtener-archivo/${carpeta}/${archivo}`;
  const scale = isMobile ? 0.5 : 1.3; // Estado para controlar el tamaño del PDF

  return (
    <div style={{ marginTop: "20px" }}>
      {/* <a href={url} target="_blank" rel="noopener noreferrer">
        <FaFileDownload className='me-2'/>Descargar archivo
      </a> */}
      {url && (
        <div
          style={{
          border: "1px solid #ccc",
          width: "100%",
          height: "calc(100vh - 200px)",
          margin: "0 auto",
          }}
        > 
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer 
              fileUrl={url} 
              defaultScale={scale} // Ajusta el tamaño según el estado
            />
          </Worker>
        </div>
      )}
    </div>
  );
};

export default function DocPaquetaCreditoPDF({ credito }) {

/*   const solicitud = (`${config.apiUrl2}/upload/obtener-archivo/${format(new Date(credito?.credito.createdAt), 'yyyy-MM-dd')}_${credito.credito.nombre}/simulador_credito.pdf`); // Cambia esta ruta
  const relacion = (`${config.apiUrl2}/upload/obtener-archivo/${format(new Date(credito?.credito.createdAt), 'yyyy-MM-dd')}_${credito.credito.nombre}/relacion_cuentas_y_terceros.pdf`); // Cambia esta ruta
 */
  const [solicitud, setSolicitud] = useState();
  const [relacion, setRelacion] = useState();

  /* useEffect(()=>{
    const pdfSOlicitud = (`${config.apiUrl2}/upload/pdf/${format(new Date(credito?.credito.createdAt), 'yyyy-MM-dd')}_${credito.credito.nombre}/simulador_credito.pdf`)
    setSolicitud(pdfSOlicitud)
    const pdfRelacion = (`${config.apiUrl2}/upload/pdf/${format(new Date(credito?.credito.createdAt), 'yyyy-MM-dd')}_${credito.credito.nombre}/relacion_cuentas_y_terceros.pdf`);
    setRelacion(pdfRelacion)
  },[]) */

  /* const urlPDF = `${config.apiUrl2}/upload/obtener-archivo/${format(new Date(credito.credito.createdAt), 'yyyy-MM-dd')}_${credito.credito.nombre}/simulador_credito.pdf`; */

  return (
    credito && (
      <Document
        title={`${credito?.id}-PDV`}
        author="Gran Langostino S.A.S"
        subject="Pedido de Venta"
        keywords="pedido venta langostino"
        creator="Gran Langostino S.A.S"
        producer="Gran Langostino S.A.S"
        pageMode="fullScreen"
      >

        {/* pagina de solicitud de credito */}
        <Page size="A4" style={styles.page}>
          <View style={styles.borderPage}>
            {/* Encabezado */}
            <View style={styles.row}>
              <View style={styles.columnheader}>
                  <Image src={Logo} style={styles.logo} />
              </View>
              <View style={styles.columnheader}>
                  <Text style={styles.fechaHeader}>Fecha: </Text>
                  <Text style={styles.inputFecha}>{credito && `${new Date(credito?.credito.createdAt).getDate()}/${new Date(credito?.credito.createdAt).getMonth()+1}/${new Date(credito?.credito.createdAt).getFullYear()}`}</Text>
              </View>
              <View style={styles.columnheader}>
                  <Text style={styles.fechaHeader}>RADICACION No.: </Text>
                  <Text style={styles.inputFecha}>{credito?.credito.id}</Text>
              </View>
            </View>

            {/* Información del Crédito */}
            <Text style={styles.subheaderTop}>I. DATOS DEL CRÉDITO</Text>
            <View style={styles.section}>
              <View style={styles.row}>
                <View style={styles.column40}>
                  <Text style={styles.label}>Valor solicitado: $</Text>
                  <Text style={styles.input}>{Number(credito?.credito.valorSolicitado).toLocaleString("ES-es")}</Text>
                </View>
                <View style={styles.column20}>
                  <Text style={styles.label}>Plazo: </Text>
                  <Text style={styles.input}>{credito?.credito.plazo} meses</Text>
                </View>
                <View style={styles.column40}>
                  <View style={styles.checkboxRow}>
                    <Text>Modalidad de pago:</Text>
                    <View style={credito?.credito.modalidad === 'quincena' ? styles.checkedBox : styles.checkbox}></View>
                    <Text>Quincenal</Text>
                    <View style={credito?.credito.modalidad === 'mensual' ? styles.checkedBox : styles.checkbox}></View>
                    <Text>Mensual</Text>
                  </View>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column60}>
                  <View style={styles.checkboxRow}>
                    <Text>Destino crédito:</Text>
                    <View style={credito?.credito.destinoCredito === 'retanqueo' ? styles.checkedBox : styles.checkbox}></View>
                    <Text>Retanqueo</Text>
                    <View style={credito?.credito.destinoCredito === 'turismo' ? styles.checkedBox : styles.checkbox}></View>
                    <Text>Recreación y turismo</Text>
                    <View style={credito?.credito.destinoCredito === 'otros' ? styles.checkedBox : styles.checkbox}></View>
                    <Text>Otros</Text>
                  </View>
                </View>
                <View style={styles.column40}>
                  <Text style={styles.label}>Cual: </Text>
                  <Text style={styles.input}>{credito?.credito.descipDestino}</Text>
                </View>
              </View>
            </View>

            {/* Información del Afiliado */}
            <Text style={styles.subheader}>II. DATOS DEL TRABAJADOR AFILIADO</Text>
            <View style={styles.section}>
              <View style={styles.row}>
                <View style={styles.column40}>
                  <Text style={styles.label}>Documento de Identidad:   C.C No.</Text>
                  <Text style={styles.input}>{credito?.credito.rowId}</Text>
                </View>
                <View style={styles.column20}>
                  <Text style={styles.label}>C.E No.</Text>
                  <Text style={styles.input}>{credito?.credito.ce}</Text>
                </View>
                <View style={styles.column40}>
                  <Text style={styles.label}>Expedida en:</Text>
                  <Text style={styles.input}>{credito?.credito.lugarExpedicion}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column5}>
                  <Text style={styles.label}>Nombre y apellidos:</Text>
                  <Text style={styles.input}>{credito?.credito.nombre}</Text>
                </View>
                <View style={styles.column5}>
                  <Text style={styles.label}>e-mail:</Text>
                  <Text style={styles.input}>{credito?.credito.correo}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column5}>
                  <Text style={styles.label}>Estado civil:</Text>
                  <Text style={styles.input}>{credito?.credito.estadoCivil}</Text>
                </View>
                <View style={styles.column5}>
                  <View style={styles.checkboxRow}>
                    <Text>Sexo:</Text>
                  <View style={credito?.credito.sexo === 'masculino' ? styles.checkedBox : styles.checkboxSexo}></View>
                    <Text>Masculino</Text>
                  <View style={credito?.credito.sexo === 'femenino' ? styles.checkedBox : styles.checkboxSexo}></View>
                    <Text>Femenino</Text>
                  </View>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column40}>
                  <Text style={styles.label}>Fecha de nacimiento:</Text>
                  <Text style={styles.input}>{credito && `${new Date(credito?.credito.fechaNacimiento).getDate()}/${new Date(credito?.credito.fechaNacimiento).getMonth()+1}/${new Date(credito?.credito.fechaNacimiento).getFullYear()}`}</Text>
                </View>
                <View style={styles.column40}>
                  <Text style={styles.label}>Lugar de nacimiento:</Text>
                  <Text style={styles.input}>{credito?.credito.lugarNacimiento}</Text>
                </View>
                <View style={styles.column20}>
                  <Text style={styles.label}>Personas a cargo:</Text>
                  <Text style={styles.input}>{credito?.credito.personasAcargo}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column60}>
                  <Text style={styles.label}>Dirección residencia:</Text>
                  <Text style={styles.input}>{credito?.credito.direccionResidencia}</Text>
                </View>
                <View style={styles.column20}>
                  <Text style={styles.label}>Ciudad:</Text>
                  <Text style={styles.input}>{credito?.credito.ciudadResidencia}</Text>
                </View>
                <View style={styles.column20}>
                  <Text style={styles.label}>Celular:</Text>
                  <Text style={styles.input}>{credito?.credito.celularResidencia}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column5}>
                  <Text style={styles.label}>Nombre agencia:</Text>
                  <Text style={styles.input}>{credito?.credito.nombreAgencia}</Text>
                </View>
                <View style={styles.column5}>
                  <Text style={styles.label}>Ciudad:</Text>
                  <Text style={styles.input}>{credito?.credito.ciudadAgencia}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column33}>
                  <Text style={styles.label}>Cuenta bancaria No.:</Text>
                  <Text style={styles.input}>{credito?.credito.cuentaBancaria}</Text>
                </View>
                <View style={styles.column33}>
                  <View style={styles.checkboxRow}>
                    {/* <Text>Sexo:</Text> */}
                  <View style={credito?.credito.tipoCuenta === 'ahorros' ? styles.checkedBox : styles.checkboxCB}></View>
                    <Text>Cta. Ahorros</Text>
                  <View style={credito?.credito.tipoCuenta === 'corriente' ? styles.checkedBox : styles.checkboxCB}></View>
                    <Text>Cta. corriente</Text>
                  </View>
                </View>
                <View style={styles.column33}>
                  <Text style={styles.label}>Entidad bancaria:</Text>
                  <Text style={styles.input}>{credito?.credito.entidadBancaria}</Text>
                </View>
              </View>

              {/* Firma solicitante */}
              <View style={styles.row}>
                <View style={styles.column100}>
                  <Text style={styles.labelFirma}>Firma del asociado solicitante:</Text>
                  <Image src={credito?.credito.firmaAsociado} style={styles.firmaAsociado} />
                  <Text style={styles.label}>Esta solicitud no implica compromiso con FODEGRAN y esta sujeta a aprobación:</Text>
                </View>
              </View>

              {/* aprobarciones */}
              <View style={styles.row}>
                <View style={styles.columnFirmas}>
                  {(credito?.credito.estado === 'Gerencia' || credito?.credito.estado === 'Tesoreria' || credito?.credito.estado === 'Finalizado') ?
                    <Image src={Aprobado} style={styles.firma} />
                    : (credito?.credito.estado === 'Rechazado') ?
                      <Image src={Rechazado} style={styles.firma} />
                      :
                      <View style={styles.firma}></View>
                  }
                  <Text style={styles.label}>Comité de crédito:</Text>
                </View>
                <View style={styles.columnFirmas}>
                  {(credito?.credito.estado === 'Tesoreria' || credito?.credito.estado === 'Finalizado') ?
                    <Image src={Aprobado} style={styles.firma} />
                    :(credito?.credito.estado === 'Rechazado') ?
                      <Image src={Rechazado} style={styles.firma} />
                      :
                      <View style={styles.firma}></View>
                  }
                  <Text style={styles.label}>Gerencia:</Text>
                </View>
                <View style={styles.columnFirmas}>
                  {(credito?.credito.estado === 'Finalizado') ?
                    <Image src={Desembolso} style={styles.firma} />
                    :/* (credito?.credito.estado === 'Rechazado') ?
                      <Image src={Rechazado} style={styles.firma} />
                      : */
                      <View style={styles.firma}></View>
                  }
                  <Text style={styles.label}>Tesoreria:</Text>
                </View>
              </View>
            </View>
          </View>
        </Page>

        {/* Pagina de estudio de credito */}
        <Page size="A4" style={styles.page}>
          {/* Encabezado */}
          <View style={styles.borderPage}>
            <View style={styles.row}>
                <View style={styles.columnheader}>
                    <Image src={Logo} style={styles.logo} />
                </View>
                <View style={styles.columnheader}>
                    <Text style={styles.fechaHeader}>Fecha: </Text>
                    <Text style={styles.inputFecha}>{credito && `${new Date(credito?.createdAt).getDate()}/${new Date(credito?.createdAt).getMonth()+1}/${new Date(credito?.createdAt).getFullYear()}`}</Text>
                </View>
            </View>

            {/* Información General */}
            <Text style={styles.subheaderTop}>  </Text>
            <View style={styles.section}>
                <View style={styles.row}>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Documento de Identidad: </Text>
                        <Text style={styles.input}>{credito?.credito.rowId}</Text>
                    </View>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Expedida en: </Text>
                        <Text style={styles.input}>{credito?.credito.lugarExpedicion}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                <View style={styles.column3}>
                    <Text style={styles.label}>Nombres y Apellidos: </Text>
                    <Text style={styles.input}>{credito?.credito.nombre}</Text>
                </View>
                <View style={styles.column3}>
                    <Text style={styles.label}>Fecha Afiliación: </Text>
                    <Text style={styles.input}>{credito && `${new Date(credito?.credito.fechaAfiliacion).getDate()}/${new Date(credito?.credito.fechaAfiliacion).getMonth()+1}/${new Date(credito?.credito.fechaAfiliacion).getFullYear()}`}</Text>
                </View>
                </View>

                <View style={styles.row}>
                <View style={styles.column3}>
                    <Text style={styles.label}>Empresa: </Text>
                    <Text style={styles.input}>{credito?.credito.nombreAgencia}</Text>
                </View>
                <View style={styles.column3}>
                    <Text style={styles.label}>Ciudad: </Text>
                    <Text style={styles.input}>{credito?.credito.ciudadAgencia}</Text>
                </View>
                </View>
            </View>

            {/* Información de la Empresa */}
            <Text style={styles.subheader}>2. INFORMACIÓN DE LA EMPRESA</Text>
            <View style={styles.section}>
                <View style={styles.row}>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Fecha de Ingreso: {credito && `${new Date(credito?.FechaIngreso).getDate()}/${new Date(credito?.FechaIngreso).getMonth()+1}/${new Date(credito?.FechaIngreso).getFullYear()}`}</Text>
                    </View>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Salario Básico: ${Number(credito?.salarioBasico).toLocaleString("ES-es")}</Text>
                    </View>
                </View>
            </View>

            {/* Información del Periodo */}
            <Text style={styles.subheader}>3. INFORMACIÓN DEL PERIODO ACTUAL CON EL GRAN LANGOSTINO</Text>
            <View style={styles.section}>
                <View style={styles.row}>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Cesantías: ${Number(credito?.cesantias).toLocaleString("ES-es")}</Text>
                    </View>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Primas: ${Number(credito?.primas).toLocaleString("ES-es")}</Text>
                    </View>
              </View> 
              <View style={styles.row}>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Vacaciones: ${Number(credito?.vacaciones).toLocaleString("ES-es")}</Text>
                    </View>
                    <View style={styles.column3}>
                    <Text style={styles.label}>Libranza: ${Number(credito?.libranza).toLocaleString("ES-es")}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Otros: ${Number(credito?.otrosDescuentos).toLocaleString("ES-es")}</Text>
                    </View>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Banco: {credito?.banco}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Numero cuenta: {credito?.numeroCuenta}</Text>
                    </View>
                    <View style={styles.column3}>
                    <Text style={styles.label}>Total Descuentos Incluido Seg. Social: ${Number(credito?.totalDescuentoEmpresa).toLocaleString("ES-es")}</Text>
                    </View>
                </View>
            </View>

            {/* Información FODEGRAN */}
            <Text style={styles.subheader}>4. INFORMACIÓN FODEGRAN</Text>
            <View style={styles.section}>
                <View style={styles.row}>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Aporte Total Obligatorio: ${Number(credito?.aporteTotalObligatorio).toLocaleString("ES-es")}</Text>
                    </View>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Saldo Ahorro a la Vista: ${Number(credito?.saldoAhorro).toLocaleString("ES-es")}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column100}>
                        <View style={styles.checkboxRow}>
                            <Text>Posee Crédito Actualmente:</Text>
                        <View style={credito?.poseeCredito === 'si' ? styles.checkedBox : styles.checkbox}></View>
                            <Text>Sí</Text>
                        <View style={credito?.poseeCredito === 'no' ? styles.checkedBox : styles.checkbox}></View>
                            <Text>No</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Saldo a la Fecha: ${Number(credito?.saldoFecha).toLocaleString("ES-es")}</Text>
                    </View>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Cuota Mensual Crédito: ${Number(credito?.cuotaMensual).toLocaleString("ES-es")}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Total Aportes Mensual: ${Number(credito?.totalAportesMensuales).toLocaleString("ES-es")}</Text>
                    </View>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Aporte Total Voluntario: ${Number(credito?.aporteVoluntario).toLocaleString("ES-es")}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Otros (Solidaridad y Recondar): ${Number(credito?.otrosFondo).toLocaleString("ES-es")}</Text>
                    </View>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Total Descuentos con el Fondo: ${Number(credito?.totalDescuentoFondo).toLocaleString("ES-es")}</Text>
                    </View>
                </View>
            </View>

            {/* Comité de Crédito */}
            <Text style={styles.subheader}>5. COMITÉ DE CRÉDITO</Text>
            <View style={styles.section}>
                <View style={styles.row}>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Elaborado por: {credito?.elaboradoPor}</Text>
                    </View>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Fecha de Revisión: {credito && `${new Date(credito?.credito.fechaAprobacion).getDate()}/${new Date(credito?.credito.fechaAprobacion).getMonth()+1}/${new Date(credito?.credito.fechaAprobacion).getFullYear()}`}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Capacidad de Endeudamiento: {credito?.capacidad}</Text>
                    </View>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Valor Aprobado: ${(credito?.credito.estado === 'Gerencia' || credito?.credito.estado === 'Tesoreria' || credito?.credito.estado === 'Finalizado') && Number(credito?.credito.valorSolicitado).toLocaleString("ES-es")}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Tasa: {credito?.tasa} %</Text>
                    </View>
                    <View style={styles.column3}>
                        <Text style={styles.label}>Presidente Junta Directiva: {credito?.presidenteJunta}</Text>
                    </View>
                </View>
            </View>
          </View>
        </Page>

        {/* Pagina de simulador de credito */}
{/*         <Page size={"A4"}>
          <View
            style={{
              fontFamily: "Helvetica",
              display: "flex",
              flexDirection: "column",
              padding: "15px",
              textAlign: "left",
            }}
          >
            <Image style={styles.image} src={solicitud} />
            <Text>
              <div style={{ border: '1px solid #ccc', height: '500px', marginBottom: '20px' }}>
                  <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js`}>
                      <Viewer fileUrl={solicitud} />
                  </Worker>
              </div>
            </Text>
            
          </View>
        </Page> */}

        {/* Pagina de relacion de cuentas y terceros */}
{/*         <Page size={"A4"}>
          <View
            style={{
              fontFamily: "Helvetica",
              display: "flex",
              flexDirection: "column",
              padding: "15px",
              textAlign: "left",
            }}
          >
            <Image style={styles.image} src={relacion} />
          </View>
        </Page> */}
      </Document>
    )
  );
}
