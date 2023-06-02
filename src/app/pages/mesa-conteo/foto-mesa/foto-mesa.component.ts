import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerService } from 'src/app/services/http/consumer/consumer.service';
import { ToastrService } from 'ngx-toastr';
import { BaseListComponent } from 'src/app/componentes/base-list/base-list.component';
import { Pipe, PipeTransform } from '@angular/core';
import { PhotoActaPost} from './foto-acta-info.class';
@Pipe({
  name: 'base64'
})

export class Base64Pipe implements PipeTransform {
  constructor() {}

  public transform(value: any, contentType: string): any {
    var base64Content = `data:${contentType};base64,${value}`;
    return base64Content;
  }
}

@Component({
  selector: 'app-foto-mesa',
  templateUrl: './foto-mesa.component.html',
  styleUrls: ['./foto-mesa.component.css']
})


export class FotoMesaComponent extends BaseListComponent implements OnInit {

  uploadphoto: PhotoActaPost = new PhotoActaPost();

  constructor(
    router: Router,
    consumer: ConsumerService,
    toastr: ToastrService,
    routeAct: ActivatedRoute) {
    super(router, consumer, toastr, routeAct);
    this.urlForm = './app/pages/seleccion-mesa/conteo-mesa'; /* Ruta del formulario */
    //this.urlForm = './app/pages/foto-mesa/foto-mesa'; /* Ruta del formulario */
     const navigation = this.router.getCurrentNavigation();
   const state = navigation?.extras.state as {
      id_acta: number,
      selected_mesa: string,
      selected_id_mesa: number
    } | undefined ;
    this.selected_mesa = state?.selected_mesa;
    this.selected_id_mesa = state?.selected_id_mesa;
    this.id_acta = state?.id_acta;
  }

  ngOnInit(): void {
    //Se debe consultar si la foto del acta ya existe; si existe, entonces modificar this.fotoActaSubida a true!
    this.fotoActaSubida = false;

  }
  selected_mesa: any;
  selected_id_mesa: any;
  id_acta: any;
  fileToUpload: any;
  imageUrl: any;
  fotoActaSubida = false;
  private base64textString: String = "";
  photo = '/assets/img/no-image-available-gray.png';
  photoTitle = "No hay foto de acta disponible";

  async btnGuardar() {
      if(confirm("Esta seguro que la foto es correcta?")) {
        //Se sube el base64 de la foto this.base64TextString al API
        this.uploadphoto.Consulta = 'C';
        this.uploadphoto.id_usuario = this.global.InfoUsr.usuario_id;
        this.uploadphoto.id_acta = this.id_acta;
        this.uploadphoto.foto = this.base64textString.toString();

        var consumerApiUploadPhoto = await this.consumer.Post('api/Mesas/UploadPhoto/',this.uploadphoto);
        
        if (consumerApiUploadPhoto.success) {
            alert('Foto de Acta procesada correctamente');
        } else {
          alert('Error al procesar foto de acta: ' + consumerApiUploadPhoto.message);
        }    

      }
   }
  onFileChanged(event: any) {
    const file = event.target.files[0]
  }

  handleFileInput(event: any) {

    this.fileToUpload = event.target.files.item(0);
    var files = event.target.files;
    var file = files[0];

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);

    if (files && file) {
      var reader2 = new FileReader();

      reader2.onload = this._handleReaderLoaded.bind(this);

      reader2.readAsBinaryString(file);
    }

  }
  handleFileSelect(evt: any) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);

    //Imprime en consola imagen en base64
    console.log(btoa(binaryString));
  }

 }


