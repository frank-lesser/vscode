/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IServerChannel } from 'vs/base/parts/ipc/node/ipc';
import { Event, buffer } from 'vs/base/common/event';
import { IResolvingProgressEvent, IRemoteAuthorityResolverService } from 'vs/platform/remote/common/remoteAuthorityResolver';

export class RemoteAuthorityResolverChannel implements IServerChannel {

	onResolvingProgress: Event<IResolvingProgressEvent>;

	constructor(private service: IRemoteAuthorityResolverService) {
		this.onResolvingProgress = buffer(service.onResolvingProgress, true);
	}

	listen(_, event: string): Event<any> {
		switch (event) {
			case 'onResolvingProgress': return this.onResolvingProgress;
		}

		throw new Error('Invalid listen');
	}

	call(_, command: string, args?: any): Thenable<any> {
		switch (command) {
			case 'resolveAuthority': return this.service.resolveAuthority(args[0]);
			case 'getRemoteAuthorityResolver': return this.service.getRemoteAuthorityResolver(args[0]);
		}

		throw new Error('Invalid call');
	}
}

