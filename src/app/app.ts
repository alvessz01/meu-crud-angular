import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para o *ngFor
import { FormsModule } from '@angular/forms';   // Importante para o [(ngModel)]

interface Contato {
  id: number;
  nome: string;
  dataNascimento: string;
  telefone: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  // A MÁGICA ESTÁ NESSA LINHA ABAIXO:
  imports: [CommonModule, FormsModule], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  novoNome = '';
  novaData = '';
  novoTelefone = '';
  
  itemEmEdicao: Contato | null = null;
  itens: Contato[] = [];
  proximoId = 1;
  mensagem: string | null = null;

  mostrarPopup(texto: string) {
    this.mensagem = texto;
    setTimeout(() => this.mensagem = null, 3000);
  }

  adicionarItem() {
    if (this.novoNome.trim() !== '') {
      this.itens.push({
        id: this.proximoId++,
        nome: this.novoNome,
        dataNascimento: this.novaData,
        telefone: this.novoTelefone
      });
      this.mostrarPopup('✅ Contato adicionado!');
      this.limparCampos();
    }
  }

  editarItem(item: Contato) {
    this.itemEmEdicao = item;
    this.novoNome = item.nome;
    this.novaData = item.dataNascimento;
    this.novoTelefone = item.telefone;
  }

  salvarEdicao() {
    if (this.itemEmEdicao) {
      this.itemEmEdicao.nome = this.novoNome;
      this.itemEmEdicao.dataNascimento = this.novaData;
      this.itemEmEdicao.telefone = this.novoTelefone;
      this.itemEmEdicao = null;
      this.mostrarPopup('🚀 Atualizado com sucesso!');
      this.limparCampos();
    }
  }

  deletarItem(id: number) {
    this.itens = this.itens.filter(i => i.id !== id);
    this.mostrarPopup('🗑️ Contato excluído!');
  }

  limparCampos() {
    this.novoNome = ''; this.novaData = ''; this.novoTelefone = '';
  }
}