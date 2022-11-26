import React, { Component } from 'react'
import {Button} from 'reactstrap'
import jsPDF from 'jspdf';
import logo from '../../image/a.png'
 class Presentacion extends Component {
    pdfGenerate=()=>{
        var doc=new jsPDF('landscape','px','a4','false');
        doc.addImage(logo,'PNG',65,20,500,400)
        doc.addPage()
        doc.setFont('Helvertica','bold')
        doc.text(60,50,'Terminos y Condiciones')
        doc.text(60,120,'Integrantes')
        doc.setFont('Helvertica','Normal')
        doc.text(100,60,'Los presentes términos y condiciones tienen por objeto establecer las directrices que regulan el uso de los ')
        doc.text(100,70 ,'Sitios de E-Commece provistos por GET JUSTO S.A.C a todos los consumidores establecidos en territorio ' )
        doc.text(100,80,'peruano que acepten los presentes términos y condiciones')
        doc.text(100,100,'El Usuario debe leer, entender y aceptar todas las condiciones establecidas en los presentes términos')
        doc.text(100,110,'y condiciones con anterioridad a su acceso como Usuario.Asimismo es recomendable que revise el documento')
        doc.text(100,130,'Chumpitaz Linares Carlos Rodrigo')
        doc.text(100,140,'Chuchon Paquiyauri Yasmin Cristel')
        doc.text(100,150,'Gutierrez Ramos Ashley')
        doc.text(100,160,'Montes Limaylla Aaron Alexander')
        doc.text(100,170,' Sanchez Chumpitaz Victor Piero')
        doc.text(100,180,'Carranza Diaz Airon Javier')
        doc.save('presentacion.pdf')
    }
    
  render() {
    return (
      <div style={{textAlign:'center'}}><br/>
          <Button onClick={this.pdfGenerate}>Descargar</Button>
      </div>
    )
  }
}

export default Presentacion;
