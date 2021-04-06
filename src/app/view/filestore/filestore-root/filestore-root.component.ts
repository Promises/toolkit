import { Component, OnInit } from '@angular/core';
import { FilestoreIndex } from './index-detail/index-detail.component';
import { FilestoreService } from '../../../filestore/filestore.service';
import { IndexId, indexIdMap } from '@runejs/filestore';


@Component({
    selector: 'rs-filestore-root',
    templateUrl: './filestore-root.component.html',
    styleUrls: ['./filestore-root.component.scss']
})
export class FilestoreRootComponent implements OnInit {

    public indexes: FilestoreIndex[] = [];

    public constructor(private filestoreService: FilestoreService) {
        this.filestoreService.breadcrumb = [];
    }

    public ngOnInit(): void {
        this.filestoreService.fileDisplay = 'grid';
        for(let i = 0; i <= 12; i++) {
            const index = this.filestoreService.getIndex(i);

            let indexName = '?';
            Object.keys(indexIdMap).forEach(name => {
                if(indexIdMap[name] === i) {
                    indexName = name;
                }
            });

            this.indexes.push({
                index,
                files: [ ...index.files.values() ]
            });
        }
    }

}
