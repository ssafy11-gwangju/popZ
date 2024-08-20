package popz.solpop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Point {

  @Id
  private long pointNo;
  private long userNo;
  private java.sql.Date popUpStoreRaffleStartDate;
  private java.sql.Time popUpStoreRaffleEndDate;
  private String popUpStoreRaffleQualification;


}
