import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Gestion des chauffeur',
                items: [
                    { label: 'Ajouter chauffeur', icon: 'pi pi-fw pi-home', routerLink: ['/driver/add'] },
                    { label: 'Liste des chauffeurs', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/driver/list'] },

                ],
            },
            {
                label: 'Gestion du client',
                items: [
                    { label: 'Ajouter client', icon: 'pi pi-fw pi-home', routerLink: ['/customer/add'] },
                    { label: 'Liste des clients', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/customer/list'] },

                ]
            },
            {
                label: 'Gestion des livraisons',
                items: [
                    { label: 'Ajouter livraison', icon: 'pi pi-fw pi-home', routerLink: ['/delivery/add'] },
                    { label: 'Liste des livraisons', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/delivery/list'] },

                ]
            },
            {
                label: 'Gestion des véhicules',
                items: [
                    { label: 'Ajouter véhicule', icon: 'pi pi-fw pi-home', routerLink: ['/truck/add'] },
                    { label: 'Liste des véhicules', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/truck/list'] },

                ]
            },
            {
                label: 'Blockchain',
                items: [
                    { label: 'Liste des Blockchains', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/blockchain'] },

                ]
            }

           
           
           
        ];
    }
}
