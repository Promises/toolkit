import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Archive, FileData, FileIndex, indexIdMap } from '@runejs/filestore';
import { FileNamePipe } from '../file-name/file-name.pipe';
import { FilestoreService } from '../../filestore/filestore.service';
import { Router } from '@angular/router';


@Component({
    selector: 'rs-file',
    templateUrl: './file.component.html',
    styleUrls: [ './file.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent implements OnInit {

    @Input() public icon: string | null = null;
    @Input() public file: Archive | FileData;
    @Input() public index: FileIndex;
    private name: string = '';

    public constructor(private router: Router,
                       private fileName: FileNamePipe,
                       private filestoreService: FilestoreService) {
    }

    public ngOnInit(): void {
        this.name = this.fileName.transform(this.file, this.index);
    }

    public fileClicked(): void {
        if(this.file.type === 'file' || this.index.indexId === indexIdMap.widgets) {
            const { file, index } = this;
            this.filestoreService.previewFileEvent.next({ file, index });
        } else if(this.file.type === 'archive') {
            this.router.navigate([ '/', 'filestore', 'index', `${this.index.indexId}`, 'archive', `${this.file.fileId}` ]);
        }
    }

    public get fileIcon(): string {
        if(this.icon) {
            return this.icon;
        }

        if(this.file.type === 'archive') {
            return this.index.indexId === indexIdMap.widgets ? 'widgets' : 'folder';
        }

        if(this.index.indexId === indexIdMap.music) {
            return 'video_library';
        } else {
            if(this.name.endsWith('.jpg') || this.name.endsWith('.jpeg') || this.name.endsWith('.png')) {
                return 'image';
            }
        }

        return 'insert_drive_file';
    }

    public get archive(): Archive {
        return this.file.type === 'archive' ? this.file as Archive : null;
    }

}
