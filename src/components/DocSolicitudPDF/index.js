import React from "react";
import { Document, Page, View, Text, StyleSheet , Image } from "@react-pdf/renderer";
import Logo from '../../assets/fodegran.jpeg' 
import Aprobado from '../../assets/aprobado.png'
import Rechazado from '../../assets/rechazado.png'
import Desembolso from '../../assets/Desembolso.png'

// Estilos para el documento
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 9,
    fontFamily: "Helvetica",
  },
  borderPage:{
    border: '1 solid black'
  },
  header: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 12,
    fontWeight: "bold",
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
  section: {
    /* marginBottom: 10, */
    borderTop:'1 solid black',
    borderBottom:'1 solid black',
    /* margin: 5, */
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    /* marginBottom: 5, */
  },
  column: {
    width: "45%",
  },
  label: {
    fontWeight: "bold",
    /* marginBottom: 2, */
  },
  labelFirma:{
    fontWeight: "bold",
    alignSelf: "center",
  },
  input: {
    /* borderBottom: "1 solid black", */
    width: "auto",
    height: 12,
    paddingLeft: 2
    /* marginBottom: 3, */
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
    padding: 2,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  checkbox: {
    width: 10,
    height: 10,
    border: "1 solid black",
    marginRight: 5,
  },
  logo: {
    width: 190,
    height: 75,
    marginBottom: 2,
    alignSelf: "center",
    marginLeft: 10
  },
  column2:{
    width: "50%",
    display:'flex',
    flexDirection:'row',
    border: "1 solid black",
    padding: 8,
    paddingLeft: 3
  },
  column3:{
    width: "33%",
    display:'flex',
    flexDirection:'row',
  },
  columnFirmas:{
    width: "33.5%",
    display:'flex',
    flexDirection:'column',
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
  header: {
    textAlign: "center",
    marginBottom: 0,
    fontSize: 12,
    fontWeight: "bold",
  },
  fechaHeader:{
    textAlign: "start",
    marginTop: 60,
    fontSize: 10,
    fontWeight: "bold",
    display:'flex',
    /* backgroundColor:'#CDCDCD', */
  },
  subheader:{
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
    backgroundColor:'#CDCDCD',
    padding: 5
  },
  subheaderTop:{
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
    backgroundColor:'#CDCDCD',
    borderTop: "1 solid black",
    padding:4
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  checkbox: {
    width: 10,
    height: 10,
    border: "1 solid black",
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
  checkedBox: {
    width: 12,
    height: 12,
    backgroundColor: "black",
    marginRight: 5,
    marginLeft:10,
  },
});

const PDFFormSolicitud = ({ credito }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.borderPage}>
        {/* Encabezado */}
        <View style={styles.row}>
          <View style={styles.column3}>
              <Image src={Logo} style={styles.logo} />
          </View>
          <View style={styles.column3}>
              <Text style={styles.fechaHeader}>Fecha: </Text>
              <Text style={styles.inputFecha}>{credito && `${new Date(credito?.createdAt).getDate()}/${new Date(credito?.createdAt).getMonth()+1}/${new Date(credito?.createdAt).getFullYear()}`}</Text>
          </View>
          <View style={styles.column3}>
              <Text style={styles.fechaHeader}>RADICACION No.: </Text>
              <Text style={styles.inputFecha}>{credito?.id}</Text>
          </View>
        </View>

        {/* Información del Crédito */}
        <Text style={styles.subheaderTop}>I. DATOS DEL CRÉDITO</Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.column40}>
              <Text style={styles.label}>Valor solicitado: $</Text>
              <Text style={styles.input}>{Number(credito?.valorSolicitado).toLocaleString("ES-es")}</Text>
            </View>
            <View style={styles.column20}>
              <Text style={styles.label}>Plazo: </Text>
              <Text style={styles.input}>{credito?.plazo} meses</Text>
            </View>
            <View style={styles.column40}>
              <View style={styles.checkboxRow}>
                <Text>Modalidad de pago:</Text>
                <View style={credito?.modalidad === 'quincena' ? styles.checkedBox : styles.checkbox}></View>
                <Text>Quincenal</Text>
                <View style={credito?.modalidad === 'mensual' ? styles.checkedBox : styles.checkbox}></View>
                <Text>Mensual</Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column60}>
              <View style={styles.checkboxRow}>
                <Text>Modalidad de pago:</Text>
                <View style={credito?.destinoCredito === 'retanqueo' ? styles.checkedBox : styles.checkbox}></View>
                <Text>Retanqueo</Text>
                <View style={credito?.destinoCredito === 'turismo' ? styles.checkedBox : styles.checkbox}></View>
                <Text>Recreación y turismo</Text>
                <View style={credito?.destinoCredito === 'otros' ? styles.checkedBox : styles.checkbox}></View>
                <Text>Otros</Text>
              </View>
            </View>
            <View style={styles.column40}>
              <Text style={styles.label}>Cual: </Text>
              <Text style={styles.input}>{credito?.descipDestino}</Text>
              </View>
          </View>
        </View>

        <Text style={styles.subheader}>II. DATOS DEL TRABAJADOR AFILIADO</Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.column40}>
              <Text style={styles.label}>Documento de Identidad:   C.C No.</Text>
              <Text style={styles.input}>{credito?.rowId}</Text>
              </View>
            <View style={styles.column20}>
              <Text style={styles.label}>C.E No.</Text>
              <Text style={styles.input}>{credito?.ce}</Text>
            </View>
            <View style={styles.column40}>
              <Text style={styles.label}>Expedida en:</Text>
              <Text style={styles.input}>{credito?.lugarExpedicion}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column2}>
              <Text style={styles.label}>Nombre y apellidos:</Text>
              <Text style={styles.input}>{credito?.nombre}</Text>
            </View>
            <View style={styles.column2}>
              <Text style={styles.label}>e-mail:</Text>
              <Text style={styles.input}>{credito?.correo}</Text>
              </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column2}>
              <Text style={styles.label}>Estado civil:</Text>
              <Text style={styles.input}>{credito?.estadoCivil}</Text>
              </View>
            <View style={styles.column2}>
              <View style={styles.checkboxRow}>
                <Text>Sexo:</Text>
                <View style={credito?.sexo === 'masculino' ? styles.checkedBox : styles.checkboxSexo}></View>
                <Text>Masculino</Text>
                <View style={credito?.sexo === 'femenino' ? styles.checkedBox : styles.checkboxSexo}></View>
                <Text>Femenino</Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column40}>
              <Text style={styles.label}>Fecha de nacimiento:</Text>
              <Text style={styles.input}>{credito && `${new Date(credito?.fechaNacimiento).getDate()}/${new Date(credito?.fechaNacimiento).getMonth()+1}/${new Date(credito?.fechaNacimiento).getFullYear()}`}</Text>
              </View>
            <View style={styles.column40}>
              <Text style={styles.label}>Lugar de nacimiento:</Text>
              <Text style={styles.input}>{credito?.lugarNacimiento}</Text>
              </View>
            <View style={styles.column20}>
              <Text style={styles.label}>Personas a cargo:</Text>
              <Text style={styles.input}>{credito?.personasAcargo}</Text>
              </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column33}>
              <Text style={styles.label}>Dirección residencia:</Text>
              <Text style={styles.input}>{credito?.direccionResidencia}</Text>
              </View>
            <View style={styles.column33}>
              <Text style={styles.label}>Ciudad:</Text>
              <Text style={styles.input}>{credito?.ciudadResidencia}</Text>
              </View>
            <View style={styles.column33}>
              <Text style={styles.label}>Celular:</Text>
              <Text style={styles.input}>{credito?.celularResidencia}</Text>
              </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column2}>
              <Text style={styles.label}>Nombre agencia:</Text>
              <Text style={styles.input}>{credito?.nombreAgencia}</Text>
              </View>
            <View style={styles.column2}>
              <Text style={styles.label}>Ciudad:</Text>
              <Text style={styles.input}>{credito?.ciudadAgencia}</Text>
              </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column33}>
              <Text style={styles.label}>Cuenta bancaria No.:</Text>
              <Text style={styles.input}>{credito?.cuentaBancaria}</Text>
              </View>
            <View style={styles.column33}>
              <View style={styles.checkboxRow}>
              <View style={credito?.tipoCuenta === 'ahorros' ? styles.checkedBox : styles.checkboxCB}></View>
              <Text>Cta. Ahorros</Text>
              <View style={credito?.tipoCuenta === 'corriente' ? styles.checkedBox : styles.checkboxCB}></View>
              <Text>Cta. corriente</Text>
              </View>
            </View>
            <View style={styles.column33}>
              <Text style={styles.label}>Entidad bancaria:</Text>
              <Text style={styles.input}>{credito?.entidadBancaria}</Text>
              </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column100}>
              <Text style={styles.labelFirma}>Firma del asociado solicitante:</Text>
              {credito?.firmaAsociado ?
                <Image src={credito?.firmaAsociado} style={styles.firmaAsociado} />
                :
                <View style={styles.firmaAsociado}></View>
              }
              <Text style={styles.label}>Esta solicitud no implica compromiso con FODEGRAN y esta sujeta a aprobación:</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.columnFirmas}>
              {(credito?.estado === 'Comité de crédito' || credito?.estado === 'Gerencia' || credito?.estado === 'Tesoreria' || credito?.estado === 'Finalizado') ?
                <Image src={Aprobado} style={styles.firma} />
                : (credito?.estado === 'Rechazado') ?
                  <Image src={Rechazado} style={styles.firma} />
                  :
                  <View style={styles.firma}></View>
              }
            <Text style={styles.label}>Comité de crédito:</Text>
            </View>
            <View style={styles.columnFirmas}>
              {(credito?.estado === 'Gerencia' || credito?.estado === 'Tesoreria' || credito?.estado === 'Finalizado') ?
                <Image src={Aprobado} style={styles.firma} />
                :(credito?.estado === 'Rechazado') ?
                  <Image src={Rechazado} style={styles.firma} />
                  :
                  <View style={styles.firma}></View>
              }
              <Text style={styles.label}>Gerencia:</Text>
            </View>
            <View style={styles.columnFirmas}>
              {(credito?.estado === 'Tesoreria' || credito?.estado === 'Finalizado') ?
                <Image src={Desembolso} style={styles.firma} />
                :/* (credito?.estado === 'Rechazado') ?
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
  </Document>
);

export default PDFFormSolicitud;