import React, { Component } from 'react'
import {Button} from 'reactstrap'
import jsPDF from 'jspdf';
import logo from '../../image/a.png'
 class Presentacion extends Component {

    
    pdfGenerate=()=>{
        var doc=new jsPDF('landscape','px','a4','false');
        doc.addImage(logo,'PNG',65,20,500,400)
        doc.addPage()
        doc.setFont('Potta One','bold')
        doc.text(60,50,'TERMINOS Y CONDICIONES')
        doc.text(60,320,'INTEGRANTES: ')
        doc.text(60,170,'OBJETIVOS DEL CONTRATO')
        
        doc.setFont('Helvertica','sans-serif')
        doc.text(100,70,'Los presentes términos y condiciones tienen por objeto establecer las directrices que regulan el ')
        doc.text(100,80 ,' uso de los Sitios de E-Commece provistos por GET JUSTO S.A.C a todos los consumidores' )
        doc.text(100,90,'establecidos en territorio peruano que acepten los presentes términos y condiciones')
        doc.text(100,100,'El Usuario debe leer, entender y aceptar todas las condiciones establecidas en los')
        doc.text(100,110,'presentes términos y condiciones con anterioridad a su acceso como Usuario.')
        doc.text(100,120,'Asimismo es recomendable que revise el documento')
        doc.text(100,130,'Si el Usuario no está de acuerdo con alguno de los términos aquí expuestos,')
        doc.text(100,140,'no deberá acceder y/o utilizar los Sitios de E-Commece que ofrece GET JUSTO ')
        doc.text(100,150,'S.A.C para ordenar productos. ')
        
        
    
        doc.text(100,180,'Conforme a los presentes términos y condiciones, Justo brinda a los Usuarios un servicio.')
        doc.text(100,190,'gratuito, a través de cada uno de sus Sitios de E-Commerce,')
        doc.text(100,200,'que tiene la finalidad de que los Usuarios puedan ingresar a ellos')
        doc.text(100,210,'para visualizar los productos ofrecidos por las Empresas y,')
        doc.text(100,220,'de considerarlo apropiado, celebrar transacciones con ellas.')
        doc.text(100,230,'Asimismo, los consumidores aceptan las definiciones, condiciones técnicas, comerciales')
        doc.text(100,240,'y de uso de los Sitios de E-Commerce, reconociendo expresamente que la labor ')
        doc.text(100,250,'de Justo concluye al brindar el servicio necesario para que los Usuarios')
        doc.text(100,260,'y las Empresas puedan celebrar transacciones y, en consecuencia, no es responsable')
        doc.text(100,270,'de si dichas transacciones')
        doc.text(100,280,'se celebran en condiciones equitativas y/o si se ejecutan idóneamente, como tampoco,')
        doc.text(100,290,' de la calidad e inocuidad de los referidos productos.')
     

        doc.text(100,340,'Chumpitaz Linares Carlos Rodrigo')
        doc.text(100,360,'Chuchon Paquiyauri Yasmin Cristel')
        doc.text(100,380,'Gutierrez Ramos Ashley')
        doc.text(100,400,'Montes Limaylla Aaron Alexander')
        doc.text(100,420,' Sanchez Chumpitaz Victor Piero')
        doc.text(100,440,'Carranza Diaz Airon Javier')
        doc.save('TerminoyCondiciones.pdf')
    }
    
  render() {
    return (
      <div style={{textAlign:'center'}}><br/>
          <Button onClick={this.pdfGenerate} className='btn btn-danger text-light titulosistema'>DESCARGAR EL PDF DE TERMINOS Y CONDICIONES DEL SISTEMA</Button>
      </div>
    )
  }
}

export default Presentacion;
