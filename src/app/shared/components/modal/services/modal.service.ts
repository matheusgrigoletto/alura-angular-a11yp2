import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
} from '@angular/core';

import { ModalConfig } from '../interfaces/modal-config';
import { ModalRef } from '../models/modal-ref';
import { BodyInjectorService } from 'src/app/shared/services/body-injector';
import { ModalComponent } from '../modal.component';

@Injectable()
export class ModalService {
  private componentFactory: ComponentFactory<ModalComponent>;

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private bodyInjector: BodyInjectorService
  ) {
    this.componentFactory =
      componentFactoryResolver.resolveComponentFactory(ModalComponent);
  }

  open(config: ModalConfig): ModalRef {
    const componentRef = this.createComponentRef();
    componentRef.instance.config = config;

    this.bodyInjector.stackBeforeAppRoot(componentRef);

    const modalRef = new ModalRef(componentRef);
    componentRef.instance.modalRef = modalRef;

    return modalRef;
  }

  private createComponentRef(): ComponentRef<ModalComponent> {
    return this.componentFactory.create(this.injector);
  }
}
