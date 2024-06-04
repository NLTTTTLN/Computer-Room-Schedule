import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parse } from 'path';
import { PaginatedResource } from 'src/dto/pagination/paginated-resource.dto';
import { Booking } from 'src/entities/booking.entity';
import { Filtering } from 'src/helpers/decorators/filteringParams';
import { Pagination } from 'src/helpers/decorators/paginationParams';
import { Sorting } from 'src/helpers/decorators/sortingParams';
import { getOrder, getWhere } from 'src/helpers/features';
import { Between, In, Not, Repository } from 'typeorm';


@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
        
    ) {}
    
    async getAll(
        { page = 1, limit = 10, offset }: Pagination,
        sort?: Sorting,
        filter?: Filtering[],
    ): Promise<PaginatedResource<Partial<Booking>>> {
        const adjustedOffset = (page - 1) * limit;
    
        let where: any = getWhere(filter);
        
        where = where.reduce((prev, cur) => ({ ...prev, ...cur }), {});
    
        let order = getOrder(sort);
        if(sort.property === 'semester_id.start_time'){
            order = {}
        }
        const [bookings, total] = await this.bookingRepository.findAndCount({
            where,
            relations: { 
                room_code: true,
                shift_id: true,
                lecturer_code: {account_id: { role_id: true }},
                subject_id: {students: {account_id: { role_id: true }}},
                status_id: true,
                semester_id: true,
                employee_code: {account_id: { role_id: true }}
            },
            order,
            take: limit,
            skip: adjustedOffset,
        });

        if (sort && sort.property === 'semester_id.start_time') {
            if(sort.direction === 'asc'){
                bookings.sort((a, b) => {
                    if (a.semester_id.start_time > b.semester_id.start_time) {
                        return 1;
                    } else if (a.semester_id.start_time < b.semester_id.start_time) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
            }else{
                bookings.sort((a, b) => {
                    if (a.semester_id.start_time < b.semester_id.start_time) {
                        return 1;
                    } else if (a.semester_id.start_time > b.semester_id.start_time) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
            
            }
        }
        // bookings.map((booking) => {
        //     console.log(booking.semester_id.name);
        // });
        const lastPage = Math.ceil(total / limit);
        const nextPage = page < lastPage ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;
    
        bookings.map((booking) => {
            delete booking.lecturer_code.account_id.password;
            if(booking.employee_code){
                delete booking.employee_code.account_id.password;
            }
            
            booking.subject_id.students.map((student) => {
                delete student.account_id.password;
            });
        });
        //console.log(bookings[0].semester_id.start_time);
        //console.log(bookings);
        return {
            data: bookings,
            total,
            limit,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage,
        };
    };

    async getAllByStudent(student_code: string, semester_id: number) {
        
            const bookingsFound = await this.bookingRepository.find({
                where: { 
                    is_active: true, 
                    semester_id: {id: semester_id},
                },  
                relations: { 
                    room_code: true,
                    shift_id: true,
                    lecturer_code: {account_id: { role_id: true }},
                    subject_id: {students: {account_id: { role_id: true }}},
                    status_id: true,
                    semester_id: true,
                    employee_code: {account_id: { role_id: true }}
                }
            });
            const bookings = [];
        
            bookings.map((booking) => {
                delete booking.lecturer_code.account_id.password;
                if(booking.employee_code){
                    delete booking.employee_code.account_id.password;
                }
                
                booking.subject_id.students.map((student) => {
                    delete student.account_id.password;
                });
            });
            return bookings;
        
        
    }
    
    async getOne(id: number) {
        try {
            
            const bookingFound = await this.bookingRepository.findOne({
                where: { id: id },  
                relations: { 
                    room_code: true,
                    shift_id: true,
                    lecturer_code: {account_id: { role_id: true }},
                    subject_id: {students: {account_id: { role_id: true }}},
                    status_id: true,
                    semester_id: true,
                    employee_code: {account_id: { role_id: true }}
                }
            });
            if(!bookingFound) {
                throw new HttpException('Class is not fount', HttpStatus.NOT_FOUND);
            } else {
                delete bookingFound.lecturer_code.account_id.password;
                if(bookingFound.employee_code){
                    delete bookingFound.employee_code.account_id.password;
                }
                
                bookingFound.subject_id.students.map((student) => {
                    delete student.account_id.password;
                });
                return bookingFound;
            }
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    };

    async getManyByRoomDate(room_code: string, date: Date) {
        try {
            
            const formatedDate = new Date(date);
            formatedDate.setDate(formatedDate.getDate() - 1);
            const startOfDay = new Date(formatedDate);
            startOfDay.setUTCHours(0, 0, 0, 0); // Set to the start of the day in UTC
            const endOfDay = new Date(formatedDate);
            endOfDay.setUTCHours(23, 59, 59, 999);
            
            const bookingsFound = await this.bookingRepository.find({
                where: { 
                    room_code: {code: room_code},
                    date: Between(startOfDay, endOfDay),
                    status_id: { id: In([1, 2]) }
                },  
                relations: { 
                    room_code: true,
                    shift_id: true,
                    lecturer_code: {account_id: { role_id: true }},
                    subject_id: {students: {account_id: { role_id: true }}},
                    status_id: true,
                    semester_id: true,
                    employee_code: {account_id: { role_id: true }}
                }
            });
            
        
            bookingsFound.map((booking) => {
                delete booking.lecturer_code.account_id.password;
                if(booking.employee_code){
                    delete booking.employee_code.account_id.password;
                }
                
                booking.subject_id.students.map((student) => {
                    delete student.account_id.password;
                });
            });
            return bookingsFound;
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }


    async create(createBookingDto: any) {
        try {
            const { room_code, date, shift_id, lecturer_code, subject_id, status_id, semester_id } = createBookingDto;
            
            const bookingCreated = await this.bookingRepository.save({
                room_code: {code: room_code},
                date,
                shift_id: {id: shift_id}, 
                lecturer_code: {code: lecturer_code},
                subject_id: {id: subject_id},
                status_id: {id :status_id},
                semester_id: {id: semester_id},
            });
            return bookingCreated;
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    };

    async update(updateBookingDto: any, id: number) {
        try {

            const bookingFound = await this.getOne(id);
            let { room_code, date, shift_id, lecturer_code, subject_id, status_id, semester_id, employee_code } = updateBookingDto;
            if(bookingFound.status_id.id !== 1) {
                subject_id = bookingFound.subject_id.id;
            }
            console.log("employee_code", employee_code);
            if(employee_code){
                await this.bookingRepository.update({id: id} , {
                    room_code: {code: room_code || bookingFound.room_code.code},
                    date: date || bookingFound.date,
                    shift_id: {id: shift_id || bookingFound.shift_id.id}, 
                    lecturer_code: {code: lecturer_code || bookingFound.lecturer_code?.code},
                    subject_id: {id: subject_id || bookingFound.subject_id.id},
                    status_id: {id: (bookingFound.status_id.id === 1) ? (status_id || bookingFound.status_id.id) : (bookingFound.status_id.id)},
                    semester_id: {id: semester_id || bookingFound.semester_id.id},
                    employee_code: {code: employee_code || bookingFound.employee_code.code}
                });
            }else{
                await this.bookingRepository.update({id: id} , {
                    room_code: {code: room_code || bookingFound.room_code.code},
                    date: date || bookingFound.date,
                    shift_id: {id: shift_id || bookingFound.shift_id.id}, 
                    lecturer_code: {code: lecturer_code || bookingFound.lecturer_code?.code},
                    subject_id: {id: subject_id || bookingFound.subject_id.id},
                    status_id: {id: (bookingFound.status_id.id === 1) ? (status_id || bookingFound.status_id.id) : (bookingFound.status_id.id)},
                    semester_id: {id: semester_id || bookingFound.semester_id.id},
                    
                });
            }
            
            return this.getOne(id);
        } catch (error) {
            console.log(error);
            throw new HttpException(error.message, error.status);
        }
    };

    async updateMany(updateManyBookingDto: any[]) {
        try {
            if(updateManyBookingDto.length > 0){
                let updatedManyBookings = [];
                await Promise.all(updateManyBookingDto.map(async (item) => {
                    const id = item.id;
                    if(id) {
                        delete item.id;
                        updatedManyBookings.push(await this.update(item, id));
                    }
                }));
                return updatedManyBookings;
            }
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    };


}
