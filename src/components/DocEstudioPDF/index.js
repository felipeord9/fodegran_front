import React from "react";
import { Document, Page, View, Text, StyleSheet , Image } from "@react-pdf/renderer";
import Logo from '../../assets/fodegran.jpeg' 

// Estilos para el documento
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

const PDFFormEstudio = ({ credito }) => (
  <Document>
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
                    <Text style={styles.input}><Text style={styles.input}>{credito && `${new Date(credito?.credito.fechaAfiliacion).getDate()}/${new Date(credito?.credito.fechaAfiliacion).getMonth()+1}/${new Date(credito?.credito.fechaAfiliacion).getFullYear()}`}</Text></Text>
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
  </Document>
);

export default PDFFormEstudio;
