import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from "../../../../components/register-form/register-form.component";
import { ShowRegistersComponent } from "../show-registers/show-registers.component";

@Component({
    selector: 'app-register-card',
    standalone: true,
    templateUrl: './register-card.component.html',
    styleUrl: './register-card.component.css',
    imports: [CommonModule, RegisterFormComponent, ShowRegistersComponent]
})
export class RegisterCardComponent {
  constructor(){
    this.selectPageLink(this.pageLink);
  }

  pageLink: string = "Contas"
  titlePageLink!: string;
  resultList: string[] = ['Faculdade', 'Carro', 'Luz', 'Água', 'Internet', 'Aluguel', 'Cartão']
  screenNewRegister: boolean = false;
  typeForm:string = 'default';

  selectPageLink(link: string){
    this.pageLink = link;
    if(!this.screenNewRegister){
      switch(this.pageLink){
        case "Contas":
          this.titlePageLink = "Cadastro de Despesas!";
          this.resultList = ['Faculdade', 'Carro', 'Luz', 'Água', 'Internet', 'Aluguel', 'Cartão']
          break;
        case "Entradas":
          this.titlePageLink = "Cadastro de Entradas!";
          this.resultList = ['Salário']
          break;
        case "Entidades":
          this.titlePageLink = "Cadastro de Entidades!"
          this.resultList = ['Júlia', 'Carro', 'Casa']
          break;
        default:
          this.titlePageLink = "Tela de Cadastro"
          break;
      }
    } else {
      this.addNewRegister('add')
    }

    
  }

  addNewRegister(event: string){
    if(event === 'add'){
      switch(this.pageLink){
        case "Contas":
          this.typeForm = 'form-register-expenses'
          this.titlePageLink = 'Cadastro de novas Despesas'
          break;
        case "Entradas":
          this.typeForm = 'form-register-entry'
          this.titlePageLink = 'Cadastro de novas Entradas'
          break;
        case "Entidades":
          this.typeForm = 'form-register-entities'
          this.titlePageLink = 'Cadastro de novas Entidades'
          break;
        default:
          this.typeForm = 'form-register-entities'
          this.titlePageLink = 'Cadastro de novas Entidades'
          break;
      }
      this.screenNewRegister = true;
    }
  }

  return(){
    this.screenNewRegister = false
    this.selectPageLink(this.pageLink)
  }

}
